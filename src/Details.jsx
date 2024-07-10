import { useQuery } from "@tanstack/react-query";
import { Link, useParams,useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Carousel from "./Carousel";
import fetchPet from "./fetchPet";
import ErrorBoundary from "./ErrorBoundary";
import Modal from "./Modal";
const Details = () => {
    const [showModal,setShowModal]=useState(false);
    const navigate=useNavigate();//to re route thriugh progarm-navigate-we can re-route to home
    const [_,setAdoptedPet]=useContext(AdoptedPetContext);//_ -is for idc whatever it is
    const {id}=useParams();//pulls out id(parameter in url)
    const results=useQuery(["details",id],fetchPet);//["details", id] will be passed as the queryKey to fetchPet
    //cant use await on render func-refer gpt ans on this
    if(results.isLoading){
        return(
            <div className="loading-pane">
                <h2 className="loader">🕸️</h2>
            </div>
        );
    }
    const pet=results.data.pets[0];

    return (//if we enclose this with error boundary it wont catch error in loading and stuff abive it
        <div className="details">
            <Carousel Images={pet.images}/>
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal}--{pet.breed}--{pet.city}--{pet.state}
                    <button onClick={()=>setShowModal(true)}>Adopt {pet.name}</button>
                    <p>{pet.description}</p>
                    {
                        showModal ?
                        (
                            <Modal>
                            <div>
                                <h1>WOuld you like adopt {pet.name}</h1>
                                <div className="buttons">
                                    <button onClick={()=>{
                                        setAdoptedPet(pet);
                                        navigate("/");
                                    }}>Yes</button>
                                    <button onClick={()=>setShowModal(false)}>No</button>
                                </div>
                            </div>
                            </Modal>
                        ):null
                    }
                </h2>
            </div>
        </div>
    );
};
export default Details;
/*BrowserRouter in app.jsx is making available context to
components underneath it,useParams pulls out the data from context
in browserRouter

isLoading is for the first load. isFetching is for refetching.*/
function DetailsErrorBoundary(props){
    return(
        <ErrorBoundary errorComponent={<h2>
            error<Link to="/">click to return home</Link>
        </h2>}>
            <Details {...props}/>
        </ErrorBoundary>
    )//it can catch all errors coming from details
}