import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {useState, useEffect} from "react";

export default function Profile(){
    const [profile, setProfile]=useState(null);
    const token=localStorage.getItem("token");
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
        })
        .catch((error)=>{
            console.log(error);
        });
    },[]);
    if (profile === null){
        return <p>Loading...</p>
    }
    return (
    <>
        <NavBar />
            <div>
                <h1>Username: {profile.username}</h1>
                <p>Email: {profile.email}</p>
                <p>Location: {profile.location}</p>
                <p>Phone number: {profile.phone_number}</p>
            </div>

        <Footer />
    </>

    );
}