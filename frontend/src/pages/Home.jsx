import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import {useState, useEffect} from "react";
import Logout from "../components/Logout";
import {useNavigate} from "react-router-dom";
import DeletePost from "../components/DeletePost";
export default function Home(){
    const navigate=useNavigate();
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/pets/?search=${search}`)
        
        .then((response)=>{
            if (!response.ok){
                throw new Error(`Could not load pet:${response.status}`);
            }
            return response.json()
        })
        .then((data) => {
            console.log("Data:", data);
            setPets(data.results);
        })
        .catch((error) => {
            console.error("Fetch error:", error);
        });
}, [search]);
    return (
        <>
            <NavBar />
            <button  type="button" onClick={()=>navigate("/profile")}>
                My Profile
            </button>
            <Logout/>
            <SearchBar 
                search={search}
                setSearch={setSearch}
            />

            {pets.map((pet) => (
                <div key={pet.id}>
                <PetCard
                    id={pet.id}
                    name={pet.name}
                    location={pet.location}
                    image={pet.image}
                />
                <DeletePost 
                    id={pet.id} 
                    onDeleted={() => {setPets((currentPets) => currentPets.filter((item) => item.id !== pet.id)
                    );
                }}
                
                />
                </div>
            ))}
            <button type="button" onClick={()=>navigate("/upload")}>
                Upload a new pet
            </button>
            

            <Footer />
        </>
    );
}

