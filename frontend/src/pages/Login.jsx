

import {useState} from 'react';

export default function Login(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    
    const handleLogin=(event)=>{
        event.preventDefault();
        //This is a promise chain
        fetch("http://127.0.0.1:8000/api/accounts/auth/token/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username:username,
                password:password,
            }),
        })
        .then((response)=>{
            if (!response.ok){
                throw new Error("Login failed");
            }

            return response.json();
        })
        .then((data)=>{
            console.log("Login successful",data);
            localStorage.setItem("token",data.token);
            window.location.href="/home";

        })
        .catch((error)=>{
            console.log("Login error:", error);
        })
    };

return (
    <form onSubmit={handleLogin}>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
        />
        <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
        />
        <button type="submit">Login</button>

    </form>
);
    
}

