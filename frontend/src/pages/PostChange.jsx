import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
export default function PostChange(){
    
    const [existingImage, setExistingImage] = useState("");
    const [image,setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("")
    const [species, setSpecies] = useState("cat")
    const [status, setStatus] = useState("lost")
    const [color, setColor]= useState("other")
    const [sex, setSex] = useState("unknown")
    const [location, setLocation] = useState("")
    const token=localStorage.getItem("token");
    const {id}=useParams();
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/posts/pets/${id}`,{
            headers:{
                "Authorization": `Token ${token}`}
            })
        
        .then((response)=>{
            if (!response.ok){
                throw new Error("Cannot load post")
            }
            return response.json()
        })
        .catch((error)=>{
            console.log(error)
        })
        .then((data)=>{
            setExistingImage(data.image ?? "")
            setMessage(data.message ?? "")
            setName(data.name ?? "")
            setSpecies(data.species ?? "cat")
            setStatus(data.status ?? "lost")
            setColor(data.color ?? "other")
            setSex(data.sex ?? "unknown")
            setLocation(data.location ?? "")
        })
        .catch((error)=>{
            alert(error.message)
        })
    },[id,token])

        const handleSubmit=(event)=>{

            const formData=new FormData();
            event.preventDefault();

            formData.append("name",name)
            formData.append("species",species)
            formData.append("message",message)
            formData.append("status",status)
            formData.append("color",color)
            formData.append("location",location)
            formData.append("sex",sex)
            if (image){
                formData.append("image",image)
            }

        fetch(`http://127.0.0.1:8000/api/posts/pets/${id}/update/`,{
            method:"PATCH",
            headers: {"Authorization": `Token ${token}`},
            body: formData
        })
        .then(async(response)=>{
            const text=await response.text();
            console.log("Upload status:", response.status)
            console.log("Backend response:", text || "(empty response)");

            if (!response.ok) {
                throw new Error("Update failed")
            }

            alert("Pet updated")
        })
        .catch((error)=>{
            alert(error.message);
        });
    
        }
        return(
        <div>
            <h1>Edit your pet</h1>

            <form onSubmit={handleSubmit}>
                {existingImage && (
    <img src={existingImage} alt="Current pet" width="250" />
)}

                <label>
                    Replace picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                            setImage(event.target.files[0] ?? null)
                        }
                    />
                </label>
                <label>
                    Pet Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(event)=>setName(event.target.value)}
                        required
                    />
                </label>
                <select
                    value={status}
                    onChange={(event)=>setStatus(event.target.value)}
                    required
                >
                    <option value="lost">Lost</option>
                    <option value="stray">Stray</option>
                    <option value="fostered">Fostered</option>
                    <option value="reunited">reunited</option>
                    <option value="adopted">Adopted</option>
                    <option value="Claimed">Claimed</option>
                    
                </select>
                
                <select
                    value={color}
                    onChange={(event)=>setColor(event.target.value)}
                >
                    Color:
                    <option value="">Choose a color</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="orange">Orange</option>
                    <option value="grey">Grey</option>
                    <option value="other">Other</option>
                </select>
                <select
                    value={species}
                    onChange={(event)=>setSpecies(event.target.value)}
                >
                    Species
                    <option value="cat">Cat</option>
                    <option value="dog">Dog</option>
                    <option value="other">Other</option>

                </select>
                <select
                    value={sex}
                    onChange={(event)=>setSex(event.target.value)}
                >
                    Sex:
                    <option value="">Select a sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                </select>
                <label>
                    Location:
                    <input 
                        type="text"
                        value={location}
                        onChange={(event)=>setLocation(event.target.value)}
                        required
                    />

                </label>
                <label>
                    Message: 
                    <input 
                        type="text"
                        value={message}
                        onChange={(event) =>setMessage(event.target.value)}
                        required
                    />
                </label>
                <button type="submit">Save changes</button>
            </form>
        </div>
        )
    }
