const { createContext, useState } = require("react");

export const UserContex = createContext({});

export function UserContexProvider({children}){
    const [userInfo, setUserInfo] = useState({});
    return (
    <UserContex.Provider value={{userInfo, setUserInfo}}>
        {children}
    </UserContex.Provider>    
    );
}