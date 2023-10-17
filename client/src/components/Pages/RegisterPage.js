import { useState } from "react";
import { HOST } from "../../host.js"
export default function Registerpage(){
    const [username, setUsername] = useState("");
    const [password, setPassword ] = useState("");
    async function register(ev){
        ev.preventDefault();
        if(password !== '' && username !== ''){
            const response = await fetch(HOST + '/register',{
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {'Content-Type': "application/json"}
            })
            alert(`Regstration ${
                response.status === 200 ? "Succesfull" : "Failed" 
            }`);
        }
    }

    // TODO: implement useContex to manage state from app
    //      implement correct data_button->useReff
    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" 
                placeholder="Username"
                value = {username}
                onChange={ev =>
                    setUsername(ev.target.value)
                }    
            />
            <input type="password" 
                placeholder="Password" 
                value={password}
                onChange={ev => 
                    setPassword(ev.target.value)
                }
            />
            <button>Register</button>
        </form>
    );
}
