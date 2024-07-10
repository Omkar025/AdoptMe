import Pet from'./Pet';
const Results=({pets})=>{
    return(
        <div className='search'>
            {!pets.length?(
                <h1>NO pets found</h1>
            ):(
                pets.map(pet=>(
                    <Pet
                        //{...pet}//spread baby
                        animal={pet.animal}
                        id={pet.id}
                        name={pet.name}
                        breed={pet.breed}
                        images={pet.images}
                        location={`${pet.city},${pet.state}`}
                        key={pet.id}
                    />
                ))
            )}
        </div>
    
    );
};
export default Results;