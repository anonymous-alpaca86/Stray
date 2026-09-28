import {useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import PetCard from "../components/PetCard";
export default function PublicProfile(){
    const {id}=useParams();
    const [profile, setProfile]=useState(null);
    const token=localStorage.getItem("token");
    const [posts, setPosts]=useState(null);
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/accounts/user/${id}`)
    .then((response)=>{
        if (!response.ok){
            throw new Error("Cannot load profile");
        }
        return response.json();
    })
    .then((data)=>{
        setProfile(data)
    })
    .catch((error)=>{
        console.log(error)
    })

    },[id])
    
    
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/posts/user/${id}/pets/`)
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
    
    },[id]);
    if (profile===null){
        return (
            <p>Loading...</p>
        )
    }
    if (posts===null){
        return(
            <p>Loading...</p>
        )
    }

    

    return(
        <div>
            
            <h1>{profile.first_name}, {profile.last_name}</h1>
            <p>Contact: {profile.phone_number}</p>
            <p>Posts: </p>
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
    )

}