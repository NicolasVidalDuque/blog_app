const { createContext, useState } = require("react");

export const UserContex = createContext({});

export function UserContexProvider({children}){
    const [userInfo, setUserInfo] = useState({});
    const [imagePaths, setImagePaths] = useState({});
    const [posts, setPosts] = useState([]);
    const provider_values = {
      userInfo,
      setUserInfo,
      imagePaths,
      setImagePaths,
      posts,
      setPosts
    }
    return (
    <UserContex.Provider value={provider_values}>
        {children}
    </UserContex.Provider>    
    );
}
