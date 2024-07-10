//import { useState,useEffect } from "react";(R=removed after using react query//hooks in react)
//effect -something happen outside-eg-after submit i want req to api for pets
//import Pet from "./Pet";
import { useState } from "react";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext";
import Results from "./Results";
import useBreedList from "./useBreedList";
//import fetchBreedList from "./fetchBreedList";
import fetchSearch from "./fetchSearch";
const ANIMALSS=["bird","cat","dog","reptile"];
const SearchParams=()=>{
    const [animal,setAnimal]=useState("");//animal feeds into breedlist, that has to be controlled
    //const [breed,setBreed]=useState("");
    const [requestParams,setRequestParams]=useState({
        location:"",
        animal:"",
        breeds:"",
    });
    //const [pets,setPets]=useState([]); R
    const [breeds]=useBreedList(animal);
    const [adoptedPet, _]=useContext(AdoptedPetContext);
    const results=useQuery(["search",requestParams],fetchSearch);
    const pets=results?.data?.pets ?? [];
    //const [location,setLocation]=useState("");//dont keep hooks inside a conditional
    //const is not reassigned it is only reassigned when we run the func again
    //const locationHook=usestate("");
    //const location=locationHook[0];
    //const setLocation=locationHook[1];
    //these 3 lines are equiv to above 1 line code
    
   /* useEffect(()=>{
        requestPets();
    },[]);//useEffect(setup,dependencies)-hook
    //setup-func with effect's logic
    //dependencies-values ref in setup's code in an array
    //effect re-runs if dependencies change or 
    async function requestPets(){
        const res=await fetch(
            `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        );
        const json =await res.json();
        setPets(json.pets);
    } (R)*/
    return (
        <div className="search-params">{/*since class is reserved in js so we use className in react(also see camelcase) */}
            <form onSubmit={e=>{
                e.preventDefault();//not an actual dom event but a fake dom event
                //requestPets(); R
                const formData=new FormData(e.target);//browser api not a react thing
                //we can feed it a form and it pulls out all data  as an obj
                const obj={
                    animal:formData.get("animal") ?? "",
                    breed:formData.get("breed") ?? "",
                    location:formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }}
            >
                {
                    adoptedPet ? (
                        <div className="pet image-container">
                            <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
                        </div>
                    ):null
                }
                <label htmlFor="location">
                    Location
                    <input
                     //onChange={e=>setLocation(e.target.value)} R
                     name="location"
                     id="location" 
                     //value={location} R
                     placeholder="location"
                    />
                </label>{/*{location} is used to put value of js exp location */}
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name="animal"
                        value={animal}
                        onChange={e=>{
                            setAnimal(e.target.value);
                            //setBreed("")
                            
                        }}
                    >
                        <option/>
                        {ANIMALSS.map((animal)=>(
                            <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        disabled={!breeds.length}
                        //value={breed} R
                        name="breed"
                        /*onChange={e=>{
                            setBreed(e.target.value)
                        }}
                        onBlur={(e) => setBreed(e.target.value)} R */
                    >
                        <option/>
                        {breeds.map((breed)=>(
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
            {/*
               // pets.map(pet=>(
                //    <Pet 
                //        name={pet.name} 
                //        animal={pet.animal} 
                //        breed={pet.breed}
                //        key={pet.id}
                    />//if we dont give key then each time any changein array react
                    //will re-render the tree so by pet.id it can remember that it was
                    //there before so no need to re-render the entire tree
                //))
            */}
            <Results pets={pets}/>
        </div>
    )
}
export default SearchParams;