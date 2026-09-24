import {Link} from "react-router-dom";

function PetCard({id,name,location,image}){
    return (
        <div>
            <h2>
                <Link to={`/pets/${id}`}>{name}</Link>
            </h2>
            <p>{location}</p>
            {image && (
            <img 
                src={image}
                alt={name||"pet"}
                style={{
                    width:"250px",
                    height:"200px",
                    objectFit:"cover"
                }}
            />
            )}
        </div>
    );
}

export default PetCard;
