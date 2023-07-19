import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";

const modules = {
    toolbar:  [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['link', 'image'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'link', 'bullet', 'indent',
    'link', 'image'];


export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){
        ev.preventDefault();
        if(title.length < 1 || summary.length < 1 || content.length < 1){
            return
        }
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        // Send to server for storage in db:
        //      form-data: title, content, summary, image
        //      credentials: cookies -> token -> user data
        const response = await fetch("http://localhost:4000/post", {
			method: "POST",
			body: data,
            credentials: 'include'
		});
        if(response.ok){
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
		<form id="create-form">
			<input
				type="title"
				placeholder="Title"
				value={title}
				onChange={(ev) => setTitle(ev.target.value)}
			/>
			<input
				type="summary"
				placeholder="Summary"
				value={summary}
				onChange={(ev) => setSummary(ev.target.value)}
			/>
			<h4>Post image</h4>
			<input
				id="input-file"
				type="file"
                onChange={ev => setFiles(ev.target.files)}
            />
			<ReactQuill
				value={content}
				modules={modules}
                formats={formats}
				onChange={(newValue) => setContent(newValue)}
			/>
			<button
				style={{ marginTop: "10px" }}
				type="submit"
                onClick={createNewPost}>
				Create post
			</button>
		</form>
	);
}