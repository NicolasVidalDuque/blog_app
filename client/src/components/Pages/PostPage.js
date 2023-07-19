import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function PostPage(){
    // useParams() takes the params from the url.
    // These are defined on the Route (from App.js) by the "colon" -> :id
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null);
    useEffect(() => {
        fetch('http://localhost:4000/post/'+id)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                })
            })
    }, [])
    if(!postInfo) return '';
    return (
		<div className="post-page">
			<div className="image">
				<img
					className="image"
					src={`http://localhost:4000/${postInfo.cover}`}
				/>
			</div>
			<h1>{postInfo.title}</h1>
            <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>
		</div>
	);
}