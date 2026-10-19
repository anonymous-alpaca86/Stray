import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {useState, useEffect} from "react";
import PetCard from "../components/PetCard";

export default function Profile(){
    const [profile, setProfile]=useState(null);
    const [posts, setPosts] = useState([]);
    const token=localStorage.getItem("token");
    const [isEditing, setIsEditing] = useState(false);
    const [phone_number, setPhone_number] = useState("");
    const [location, setLocation] = useState("");

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/accounts/profile/",{
            method:"GET",
            headers:{
                "Authorization": `Token ${token}`
            }

        })
        .then((response)=>{
            if(!response.ok){
                throw new Error("Could not load profile");
            }
            return response.json();
        })
        .then((data)=>{
            setProfile(data);
            setPhone_number(data.phone_number ?? "");
            setLocation(data.location ?? "");

        })
        .catch((error)=>{
            console.log(error);
        });
    },[]);
    const handleSave=(event)=>{
        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/accounts/profile/",{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`

            },
            body: JSON.stringify({phone_number, location})
            
        })
        .then((response)=>{
            if (!response.ok){
                throw new Error("Cannot update profile")
            }
            return response.json()
        })
        .then((data)=>{
            setProfile(data)
            alert("Info updated successfully!")
            setIsEditing(false)

        })
        .catch((error)=>{
            console.log(error)
        })

        
    }
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/posts/pets/my-pets/",{
            method:"GET",
            headers:{
                "Authorization": `Token ${token}`
            }
        })
        .then((response)=>{
            if (!response.ok){
                throw new Error("Cannot load pet posts")
            }
            return response.json();
        })
        .then((data)=>{
            setPosts(data.results ?? data);
        })
        .catch((error)=>{
            console.log(error)
        })
    
    },[token]);

    if (profile === null){
        return <p>Loading...</p>
    }
    return (
        <>
        <NavBar />

        {isEditing? 
            (
                <form onSubmit={handleSave}>
                    <input
                        type="tel"
                        placeholder="Phone number"
                        pattern={String.raw`[+0-9 \(\)\-]+`}
                        title="Use digits, spaces, parentheses, + or -."                  
                        value={phone_number}
                        onChange={(e)=>setPhone_number(e.target.value)}
                    ></input>
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}
                    ></input>

                    <button type="submit">Save</button>
                    <button type="button" onClick={()=>setIsEditing(false)}>Cancel</button>

                </form>
            ):(
            <div>
                <h1>Username: {profile.username}</h1>
                <p>Email: {profile.email}</p>
                <p>Location: {profile.location}</p>
                <p>Phone number: {profile.phone_number}</p>
                <button onClick={()=>setIsEditing(true)}>Edit Profile?</button>
                <h2>Posts</h2>
                {posts.map((post)=>(
                    <PetCard
                        key={post.id}
                        id={post.id}
                        name={post.name}
                        location={post.location}
                        image={post.image}
                    />
                ))}
            </div>
            )}

        <Footer />
    </>);
}