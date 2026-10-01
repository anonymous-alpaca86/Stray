import NavBar from "../components/NavBar";
import PetCard from "../components/PetCard";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import {useState, useEffect} from "react";
import Logout from "../components/Logout";
import {useNavigate} from "react-router-dom";
import DeletePost from "../components/DeletePost";
import PostChange from "./PostChange";
export default function Home(){
    const navigate=useNavigate();
    const [pets, setPets] = useState([]);
    const [search, setSearch] = useState("");
    const [area, setArea]=useState("");
    const [status,setStatus]=useState("");
    const[currentUser, setCurrenUser]=useState("");
    const token=localStorage.getItem("token");

    //fetch profile info
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/accounts/profile/",{
            headers:{
                "Authorization":`Token ${token}`
            }
        })
        .then((response)=>{
            if (!response.ok){
                throw new Error("Cannot load profile")
            }
            return response.json()
        })
        .then((data)=>{
            setCurrenUser(data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[token])

    //fetch pet
    useEffect(() => {
        const params= new URLSearchParams;
        if (search) params.set("search", search)
        if (area) params.set("area",area)
        if (status) params.set("status",status)

    fetch(`http://127.0.0.1:8000/api/posts/pets/?${params.toString()}`)
        
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
}, [search,area,status]);
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
                area={area}
                setArea={setArea}
                status={status}
                setStatus={setStatus}
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
                    onDeleted={() => {setPets((currentPets) => currentPets.filter((item) => item.id !== pet.id));
                }}
                />
                {currentUser && currentUser.id === pet.posted_by?.id && (

                <button type="button" onClick={()=>navigate(`/pets/${pet.id}/update/`)}>
                    Edit post
                </button>
                )}
                </div>
            ))}
            
            <button type="button" onClick={()=>navigate("/upload")}>
                Upload a new pet
            </button>
            

            <Footer />
        </>
    );
}

