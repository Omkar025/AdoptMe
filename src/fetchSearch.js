async function fetchSearch({queryKey}){
    const {animal,location,breed}=queryKey[1];//to track multiple items ,
    //here querykey becomes an object and react query is fine dealkling with obj
    const res=await fetch(
        `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    if(!res.ok){
        throw new Error(`pet search not okay ${animal},${location},${breed}`);
    }
    return res.json();
}
export default fetchSearch;