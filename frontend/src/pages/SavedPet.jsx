import {useState,useEffect} from "react"
import PetCard from "../components/PetCard"
export default function SavedPet(){
    const [pets,setPets] = useState([])
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/posts/pets/my-saved-pets/", {
    headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
    },
})
        .then((response)=>{
            if (!response.ok){
                throw new Error("Cannot load pet")
            }
            return response.json()
        })
        .then((data)=>{
            console.log("Saved pet response:", data)
            setPets(data.results)
        })
        .catch((error)=>{
            console.log(error)
        })
        

    },[])
    return(
        pets.map((saved)=>(
            
                <PetCard 
                    key={saved.pet.id}
                    id={saved.pet.id}
                    name={saved.pet.name}
                    location={saved.pet.location}
                    image={saved.pet.image}
                />
            

        ))
        

    )
}