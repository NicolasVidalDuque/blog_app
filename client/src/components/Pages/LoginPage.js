import React, {useState, useEffect} from "react";
import { Navigate } from "react-router-dom";

export default function LoginPage(){
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    async function login(ev){
        ev.preventDefault(); 
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: { "Content-Type": "application/json" },
          credentials: 'include' // include token credentials with the user session
        });
        if(response.ok){
            setRedirect(true);
        }else{
            alert('Wrong credentials')
        }
    }
    if(redirect){
        return <Navigate to={'/'} /> // Redirect method in react with react router
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
            placeholder="Username" 
            value={username}
            onChange={ev =>
                setUsername(ev.target.value)
            } />
            <input type="password"
            placeholder="Password"
            value={password}
            onChange={ev =>
                setPassword(ev.target.value)
            } />
            <button>Login</button>
        </form>    
    )
}