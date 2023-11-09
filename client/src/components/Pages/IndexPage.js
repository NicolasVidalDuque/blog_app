import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Post from "../Post";
import { HOST } from "../../host.js";
import { UserContex } from "../../context/UserContext"; // Corrected the spelling

export default function IndexPage() {
    const [focusPost, setFocusPost] = useState(false);
    const [idRoute, setIdRoute] = useState('');
    const [loading, setLoading] = useState(true);
    const { posts, setPosts, imagePaths, setImagePaths } = useContext(UserContex);

    const redirect = (_id) => {
        setFocusPost(true);
        setIdRoute(_id);
    }

    useEffect(() => {
        fetch(HOST + '/allPost').then(response => {
            response.json().then(arr_posts => {
                setPosts(arr_posts);
                setLoading(false);
            })
        })
    }, [])

    useEffect(() => {
        const urlObject = {}; // Create an empty object to store URLs
        const signedUrlPromises = posts.map((post) => {
            // Store the promise in urlObject using post._id as the key
            urlObject[post._id] = fetch(HOST + '/getImageUrl/' + post.cover);
            return urlObject[post._id]; // Return the promise for Promise.all
        });
        Promise.all(signedUrlPromises)
            .then((responses) => {
                return Promise.all(responses.map((response) => response.json()));
            })
            .then((urlJsons) => {
                // Loop through the posts and set the URL for each post._id in urlObject
                posts.forEach((post, index) => {
                    urlObject[post._id] = urlJsons[index];
                });
                setImagePaths(urlObject);
            })
            .catch((error) => {
                // Handle errors here
            });
    }, [posts])

    return focusPost ? (
        <Navigate to={`/post/${idRoute}`} />
    ) : (
        <>
            {loading ? (
                // Show loading div
                <div>Loading data...</div>
            ) : (
                posts.length > 0 && posts.map(post => (
                    <Post key={post._id} imgPath={imagePaths[post._id]} post={post} redirect={redirect} />
                ))
            )}
        </>
    );
}
