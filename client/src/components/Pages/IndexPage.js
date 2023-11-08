import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"
import Post from "../Post";
import { HOST } from "../../host.js"

export default function IndexPage(){
    const [posts, setPosts] = useState([]);
    const [focusPost, setFocusPost] = useState(false);
    const [idRoute, setIdRoute] = useState('');
    const [foto, setfoto] = useState();
    const redirect = (_id) => {
		  setFocusPost(true);
      setIdRoute(_id);
	  }
 
    useEffect(() => {
      fetch(HOST + '/allPost').then(response => {
            response.json().then(posts =>{
                setPosts(posts);
            })
        })
    }, [])
  
    return focusPost ? (
        <Navigate to={`/post/${idRoute}`} />
    ) : (
      <>
        {posts.length > 0 && posts.map(post => (
            <Post key={post._id} post={post} redirect={redirect}/>
        ))}
      </>
    )
}
