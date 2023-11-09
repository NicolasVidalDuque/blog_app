import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { UserContex } from "../../context/UserContext";
import { HOST } from "../../host.js"
export default function PostPage(){
    // useParams() takes the params from the url.
    // These are defined on the Route (from App.js) by the "colon" -> :id
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null);
    const {userInfo, imagePaths} = useContext(UserContex);
    const [signedLink, setSignedLink] = useState('');

    useEffect(() => {
        console.log('useEffect')
        fetch(HOST + '/post/'+id)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                    setSignedLink(imagePaths[id]);
                })
            })
      console.log({signedLink});
    }, [])

    if(!postInfo) return '';

    return (
		<div className="post-page">
			<div className="center-elements">
				<h1>{postInfo.title}</h1>
				<time>{new Date(postInfo.createdAt).toDateString()}</time>
				<div className="author">by @{postInfo.author.username}</div>
				{userInfo.id === postInfo.author._id && (
					<div className="edit-row">
						<Link to={`/edit/${postInfo._id}`} className="edit-btn">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
							Edit post
						</Link>
					</div>
				)}
			</div>
			<div className="image">
				<img
					className="image"
					src={signedLink}
				/>
			</div>
			<div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
		</div>
	);
}
