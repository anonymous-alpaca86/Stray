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
    const [area,setArea] = useState("")
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
            setArea(data.location ??"")
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
            formData.append("area",area)
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
                    value={area}
                    onChange={(event)=>setArea(event.target.value)}
                    required
                >
                    Select an area:
                    <option value="">Select an area</option>
                    <option value="district_1">District 1</option>
                    <option value="district_2">District 2</option>
                    <option value="district_3">District 3</option>
                    <option value="district_4">District 4</option>
                    <option value="district_5">District 5</option>
                    <option value="district_6">District 6</option>
                    <option value="district_7">District 7</option>
                    <option value="district_8">District 8</option>
                    <option value="district_10">District 10</option>
                    <option value="district_11">District 11</option>
                    <option value="district_12">District 12</option>
                    <option value="thu_duc">Thu Duc City</option>
                    <option value="binh_thanh">Binh Thanh</option>
                    <option value="binh_tan">Binh Tan</option>
                    <option value="go_vap">Go Vap</option>
                    <option value="phu_nhuan">Phu Nhuan</option>
                    <option value="tan_binh">Tan Binh</option>
                    <option value="tan_phu">Tan Phu</option>
                    <option value="binh_chanh">Binh Chanh</option>
                    <option value="can_gio">Can Gio</option>
                    <option value="cu_chi">Cu Chi</option>
                    <option value="hoc_mon">Hoc Mon</option>
                    <option value="nha_be">Nha Be</option>
                    
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
