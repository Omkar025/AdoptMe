const fetchPet=async({queryKey})=>{
    const id=queryKey[1];

    const apiRes=await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
    //if its an failed req the reactquery wants to throw error
    //fetch will not always throw an error like 500
    //so we have to throw 500
    if(!apiRes.ok){
        throw new Error(`details/${id} fetch no ok`);

    }
    return apiRes.json();//reactquery expects you to return a promise
    //apiRes already return a promise so no need of await here
};
export default fetchPet;