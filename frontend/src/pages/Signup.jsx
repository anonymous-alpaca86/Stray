import {useState, useEffect} from "react"
export default function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    const handleSignup=(event)=>{
        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/accounts/signup/", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password, first_name, last_name})
            })
        .then(async (response) => {
        const data = await response.json();

        console.log("Status:", response.status);
        console.log("Backend response:", data);

        if (!response.ok) {
            throw new Error(JSON.stringify(data));
        }

         return data;
})
        .then((data)=>{
            alert(`Welcome, ${data.username}`);

        })
        .catch((error)=>{
            console.log("Signup error:",error);
        })
    };
    return (
        <form onSubmit={handleSignup}>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event)=>setUsername(event.target.value)}
        />
        <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(event)=>setEmail(event.target.value)}
        />
        <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event)=>setPassword(event.target.value)}
        />
        <input
            type="text"
            placeholder="First name"
            value={first_name}
            onChange={(event)=>setFirst_name(event.target.value)}
        />
        <input
            type="text"
            placeholder="Last name"
            value={last_name}
            onChange={(event)=>setLast_name(event.target.value)}
        />
        <button type="submit">Submit</button>

        </form>
    );
}
