const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();
const db = "mongodb+srv://vidalnico:Jo5F825Xg5ncByt5@cluster0.hezktnh.mongodb.net/?retryWrites=true&w=majority";

const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(express.json());

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
app.listen(4000);