import { useEffect, useState } from "react";
import { Form, Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import { HOST } from "../../host.js";
export default function EditPost(){
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        fetch(HOST + '/post/'+id)
            .then(response => 
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                }))
    },[])

    async function updatePost(ev){
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]){
            data.set('file', files?.[0]);
        }
        await fetch(HOST + '/post', {
            credentials: 'include',
            method: 'PUT',
            body: data
        });
        setRedirect(true);
    }

    if (redirect) {
		return <Navigate to={"/"}/>;
	}
    return (
		<form id="create-form" onSubmit={updatePost}>
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
				onChange={(ev) => setFiles(ev.target.files)}
			/>
			<Editor onChange={setContent} value={content}/>
			<button
				style={{ marginTop: "10px" }}
				type="submit">
				Update post
			</button>
		</form>
	);
}
