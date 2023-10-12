import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){
        ev.preventDefault();
        if(title.length < 1 || summary.length < 1 || content.length < 1 || files.length < 1){
            alert("Title, Summary, Image and Content are required")
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
        const response = await fetch("http://myblog.onrender.com/post", {
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
		<form id="create-form" onSubmit={createNewPost}>
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
			<Editor value={content} onChange={setContent} />
			<button
				style={{ marginTop: "10px" }}
				type="submit">
				Create post
			</button>
		</form>
	);
}
