function PetCard({name,location,image}){
    return (
        <div>
            <h2>{name}</h2>
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
