const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/'})
const fs = require('fs');
const cors = require('cors') 

require('dotenv').config();
const app = express();
const db = process.env.DB_CONNECTION; 

const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET_KEY; 

// app.use -> function adds a new middleware to the app. Essentially, whenever a request hits 
// your backend, Express will execute the functions you passed to app.use()

// Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to
// indicate any origins (domain, scheme, or port) other than its own from which a browser should
// permit loading resources.
app.use(cors({credentials:true, origin: "*"})); // if im using credentials i need to include the credentials  params

// express.json() is a built in middleware function in Express starting from v4.16.0. 
// It parses incoming JSON requests and puts the parsed data in req.body. 
app.use(express.json());

// Cookie-parser It allows you to conveniently parse and manipulate the 
// cookie data sent by the client's browser to the server.
app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(db);


app.post('/register', async (req, res) =>{
    const {username, password} = req.body;
    try{
        const userDoc = await User.create({ 
            username: username,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    }
});

app.get('/getAll', async (req, res) =>{
  const users = await User.find();
  res.status(200).json(users)
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await User.findOne({username});
    if(userDoc === null){
        return res.status(400).json('Used does not exist');
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        // .sign generates a json web token based on the secret key.
        // This token has the username and the user_id
        // Then is placed into the response cookie
        // This cookie will be stored in the browser session indicating a current valid login
        jwt.sign({username, id:userDoc._id}, secret, {}, (err, token) =>{
            if (err) throw err;
            res.cookie("token", token, {
				expires: new Date(Date.now() + 1 * 3600 * 1000),
			}).json({
				id: userDoc._id,
				username,
			});
        });
    }else{
        res.status(400).json('wrong credentials');
    }
});

// Check if the current session is active&&valid
app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    // Verifies a bunch of authentication and authorization stuff...
    // Decrypts the token into its contents: user_id, user_name
    // Appends the decrypted (with the secret key only in backend) content to the response
    if(token !== '' && typeof token !== 'undefined' && token !== null){
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        });
    }else{
        res.json({}).status(200);
    }
});

app.post('/logout', (req, res) =>{
    res.cookie('token', '').json('ok');
});

// Save post info in db and image in server
// To handle multiple files, use upload.array. For a single file, use upload.single.
// Note that the files argument depends on the name of the input specified in formData.
app.post('/post',uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
		if (err) throw err;
		const { title, summary, content } = req.body;
		await Post.create({
		    title,
		    summary,
		    content,
		    author:info.id,
		    cover:newPath
		})
		res.json('ok').status(200);
	});

});

// find all posts in db
app.get('/post', async (req, res)=>{
    res.json(await Post.find() 
                        .populate('author', ['username']) // go look for the author-user by the reference and add the username & id to the "author" field in the object array
                        .sort({createdAt: -1})
                        .limit(20)
                        ).status(200);
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc).status(200)
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    
    if (req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
		if (err) throw err;
        const {id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        if (JSON.stringify(postDoc.author) !== JSON.stringify(info.id)){
            return res.status(400).json('Not the corresponding author');
        }
        await postDoc.updateOne({
            title, summary, content,
            cover:newPath ? newPath : postDoc.cover
        });
        // await Post.create({
		// 	title,
		// 	summary,
		// 	content,
		// 	author: info.id,
		// 	cover: newPath,
		// });
		res.json( postDoc).status(200);
	});

    
})

app.get('/test', (req, res) =>{
    res.json(process.env.HOST).status(200);
});

app.listen(4000);
