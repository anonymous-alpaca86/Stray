import {useState, useEffect} from "react";
import {useParams} from "react-router-dom"

export default function PetDetails(){
    const [error, setError] = useState("");
    const {id} = useParams();
    const [pet,setPet] = useState(null);
    useEffect(()=>{
    fetch(`http://127.0.0.1:8000/api/posts/pets/${id}`)
    .then((response)=>{
        if (!response.ok){
            throw new Error("Could not load pet");
        }
        return response.json();
    })
    .then((data)=>setPet(data))
    .catch((error)=>setError(error.message));
},[id]);
if (error){
    return <p1>Error</p1>
}
if(pet===null){
    return <p>Loading...</p>;
}
    return(
        <>
            <h1>{pet.name}</h1>
            <img 
                src={pet.image}
                alt={pet.name||"pet"}
                style={{
                    width:"250px",
                    height:"200px",
                    objectFit:"cover"
                }}
            />
            <p>Species: {pet.species}</p>
            <p>Message: {pet.message}</p>
            <p>Sex: {pet.sex}</p>


        </>
    )
}