
import {useState, useEffect} from "react";

export default function Upload(){
    const token=localStorage.getItem("token");

    const [image,setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("")
    const [species, setSpecies] = useState("cat")
    const [status, setStatus] = useState("lost")
    const [color, setColor]= useState("")
    const [sex, setSex] = useState("unknown")
    const [location, setLocation] = useState("")
    const handleSubmit=(event)=>{
        const formData=new FormData();
        formData.append("name",name)
        formData.append("species",species)
        formData.append("message",message)
        formData.append("image",image)
        formData.append("status",status)
        formData.append("color",color)
        formData.append("location",location)
        formData.append("sex",sex)

        event.preventDefault();
        fetch("http://127.0.0.1:8000/api/posts/pets/",{
            method:"POST",
            headers: {Authorization: `Token ${token}`},
            body: formData
        })
        .then(async(response)=>{
            const text=await response.text();
            console.log("Upload status:", response.status)
            console.log("Backendd response:", text || "(empty response)");

            if (!response.ok) {
                throw new Error("Upload failed")
            }

            alert("Pet uploaded")
        })
        .catch((error)=>{
            alert(error.message);
        });
        

    };
    return (
        <div>
            <h1>Upload your pet</h1>
            <form onSubmit={handleSubmit}>
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
                >
                    <option value="lost">Lost</option>
                    <option value="stray">Stray</option>
                    <option value="fostered">Fostered</option>
                    <option value="reunited">reunited</option>
                    <option value="adopted">Adopted</option>
                    <option value="Claimed">Claimed</option>
                </select>
                <label>
                    Pet Picture:
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(event)=>setImage(event.target.files[0])}
                        required
                    />
                </label>
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
                <button type="submit">Upload</button>
            </form>
        </div>
    )

}