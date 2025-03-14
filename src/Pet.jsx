import {Link} from 'react-router-dom';
//const Pet = (props) => {
//    return React.createElement("div", {}, [
//      React.createElement("h1", {}, props.name),
//      React.createElement("h2", {}, props.animal),
//      React.createElement("h2", {}, props.breed),
//   ]); //react knows how to handle if we give like this as an array
//};
/*const Pet=(props)=>{
    return(
        <div>
            <h1>{props.name}</h1>
            <h2>{props.animal}</h2>
            <h2>{props.breed}</h2>
        </div>
    )
};*/
const Pet=({name,animal,breed,images,location,id})=>{
    let hero="http://pets-images.dev-apis.com/pets/none.jpg"
    if(!images.length){
        hero=images[0];
    }
    return(
        <Link to={`/details/${id}`} className="pet">
            <div className="image-container">
                <img src={hero} alt={name}/>
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h2>{animal}--{breed}--{location}</h2>
            </div>
        </Link>
    )
};
export default Pet;//export default is used to export single value and
//we dont need curly braces for importing
//export is for multivalue 
//in this case we do like this-import {n1,n2} from ....