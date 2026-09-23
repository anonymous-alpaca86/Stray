import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import {useState, useEffect} from "react";
import Profile from "./Profile.jsx"
import Upload from "./Upload.jsx"
import {useNavigate} from "react-router-dom";
export default function Home(){
    const navigate=useNavigate();
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/pets/?search=${search}`)
        .then((response) => {
            console.log("Status:", response.status);
            return response.json();
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
            <SearchBar 
                search={search}
                setSearch={setSearch}
            />

            {pets.map((pet) => (
                <PetCard
                    key={pet.id}
                    name={pet.name}
                    location={pet.location}
                />
            ))}
            <button type="button" onClick={()=>navigate("/upload")}>
                Upload a new pet
            </button>
            

            <Footer />
        </>
    );
}

