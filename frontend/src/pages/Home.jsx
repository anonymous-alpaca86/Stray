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
    const [area, setArea]=useState("");
    const [status,setStatus]=useState("");
    const [page,setPage]=useState(1);
    const [next,setNext]=useState(null);
    const [previous,setPrevious]=useState(null);
    const [loading, setLoading]=useState(true);
    const [error,setError]=useState(null);
    const[currentUser, setCurrenUser]=useState("");
    const [savedPet, setSavedPet]=useState(new Set())
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
        let ignore=false
        const params= new URLSearchParams;
        if (search) params.set("search", search)
        if (area) params.set("area",area)
        if (status) params.set("status",status)
        params.set("page",page)
        setLoading(true)
        setError("")

    fetch(`http://127.0.0.1:8000/api/posts/pets/?${params.toString()}`)
        
        .then((response)=>{
            if (!response.ok){
                throw new Error(`Could not load pet:${response.status}`);
            }
            return response.json()
        })
        .then((data) => {
            if (ignore) return;
            setPets(data.results)
            setPrevious(data.previous)
            setNext(data.next)
        })
        .catch((error) => {
            if (ignore) return;
            console.error("Fetch error:", error);
            setError(error.message)
        })
        .finally(()=>{
            if (!ignore){
                setLoading(false)
            }
        })
        return () => {
        ignore = true;
    };
}, [search,area,status,page]);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/posts/pets/my-saved-pets/",{
            headers:{
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        })
        .then((response)=>{
            if (!response.ok){
                throw new Error("Cannot fetch saved pet list")
            }
            return response.json()
        })
        
        .then((data)=>{
            const ids = data.results.map(saved => saved.pet.id)
            setSavedPet(new Set(ids))
            //setSavedPet(data.results.id)
            console.log(data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])
    return (
        <>
            <NavBar />
            <button  type="button" onClick={()=>navigate("/profile")}>
                My Profile
            </button>
            <Logout/>
            <button type="button" onClick={()=>navigate("/pets/my-saved-pets/")}>
                My Saved Pets
            </button>
            <SearchBar 
                search={search}
                setSearch={(value)=>{
                    setSearch(value)
                    setPage(1)
                }}
                area={area}
                setArea={(value)=>{
                    setArea(value)
                    setPage(1)
                }}
                status={status}
                setStatus={(value)=>{
                    setStatus(value)
                    setPage(1)
                }}
               
            />
            {loading && <p>Loading...</p>}
            {!loading && error &&(
                <p role="alert">{error}</p>
            )}
            {!loading && !error && pets.length===0 &&(
                <p>No pet matches your search</p>
            )}
            {!loading && !error && (
                pets.map((pet) => {
                    const isSaved=savedPet.has(pet.id);
                    return(
                    <div key={pet.id}>
                        <PetCard
                            id={pet.id}
                            name={pet.name}
                            location={pet.location}
                            image={pet.image}
                            status={pet.status}
                            post_type={pet.post_type}
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

                        <button type="button" onClick={()=>{
                            
                            fetch(`http://127.0.0.1:8000/api/posts/pets/my-saved-pets/${pet.id}/`,{
                                method:isSaved? "DELETE":"POST",
                                headers: {
                                    Authorization: `Token ${localStorage.getItem("token")}`,
                                },
                            })
                            .then((response)=>{
                                if (!response.ok){
                                    throw new Error("Cannot delete/add this pet into saved list")
                                }
                                setSavedPet(prev=>{
                                    const next = new Set(prev)
                                    if (next.has(pet.id)){
                                        next.delete(pet.id)
                                    }
                                    else{
                                        next.add(pet.id)
                                    }
                                    return next
                                })
                            })
                            .catch((error)=>{
                                console.log(error)
                            })

                    }}
                    >    {isSaved ? "♥" : "♡"}
                        </button>
                    </div>
                    )
                })
            )}
            <button
                type="button"
                disabled={loading || Boolean(error) || !previous}
                onClick={()=>setPage((currentPage)=>currentPage-1)}
            >
                Previous
            </button>
            <button
                type="button"
                disabled={loading || Boolean(error) || !next}
                onClick={()=>setPage((currentPage)=>currentPage+1)}
            >
                Next
            </button>
            <button type="button" onClick={()=>navigate("/upload")}>
                Upload a new pet
            </button>
            

            <Footer />
        </>
    );
}

