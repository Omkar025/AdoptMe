//import {useState,useEffect} from 'react';
import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";
//const localCache={};
export default function  useBreedList(animal){
    const results=useQuery(["breeds",animal],fetchBreedList);
/*    const [breedList,setBreedList]=useState([]);
    const [status,setStatus]=useState("unloaded");

    useEffect(()=>{
        if(!animal){
            setBreedList([]);
        } else if(localCache[animal]){
            setBreedList(localCache[animal])
        }else{
            requestBreedList();
        }
        async function requestBreedList(){
            //It's defined inside useEffect so it's not recreated on every render cycle.
            setBreedList([]);
            setStatus("loading");
            const res=await fetch(
                `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
            )
            const json=await res.json();
            localCache[animal]=json.breeds||[];
            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    },[animal]);
    this code was before using react query and refactoring*/
    return [results?.data?.breeds ??[],results.status];//refer gpt for explaining
}