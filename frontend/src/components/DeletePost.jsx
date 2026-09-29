import {useNavigate} from "react-router-dom"

export default function DeletePost({id,onDeleted}){
    const token=localStorage.getItem("token");
    const handleDelete=()=>{
        fetch(`http://127.0.0.1:8000/api/posts/pets/${id}/`,{
            method:"DELETE",
            headers:{
                "Authorization": `Token ${token}`
            }
        })
        .then((response)=>{
            if (!response.ok){
                throw new Error("Cannot delete post")
            }
            onDeleted()

        })
        .catch((error)=>{
            console.log(error)
            alert("You cannot delete others' post")

        })
    }

    return (
        <>
            <button type="button" onClick={handleDelete}>Delete post</button>
        </>
    )
}