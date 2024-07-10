import { useState } from 'react';
import {createRoot} from 'react-dom/client';//from client/browser side bcoz client and server stuff in diff packages
import { Link,BrowserRouter,Routes,Route } from 'react-router-dom';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import SearchParams from './SearchParams';
import Details from './Details';
//React query cache is stored in-memory
const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:Infinity,//give in millisecs,time after which data is fetched again
      cacheTime:Infinity,//how long used data is stored in cache
    },
  },
})
const App = () => {
  const adoptedPet=useState(null);//setState is done in details,searchparams
//adopetdPet is a whjole hook(a,setA)==array without destructing(crudely)

  //const [user,setUser]=useState(null); to track which user if app is this small
  //but if there are 40 or more pages tracking users then using context is the way
  //we can give user as props to Details and SearchParams
  return(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          {/*the adoptedPet is implicitly passed to searcghparams and details */}
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>
          {/*<Pet name="Luna" animal="dog" breed="Havanese"/>
           <Pet name="Pepper" animal="bird" breed="Cocktail"/>
          <Pet name="Doink" animal="cat" breed="Mixed"/>*/}
          <Routes>
            <Route path="/details/:id" element={<Details/>}/>
            <Route path="/" element={<SearchParams/>}/>
          </Routes>
        </AdoptedPetContext.Provider> 
      </QueryClientProvider>
      
    </BrowserRouter>
  );
  //BrowserRouter QueryClientProvider  both use context under the hood
};//before there was switch component in react router
//which render only one route at a time on the basis of some importance
/*now its not there */
//id is the varuable that you arev coming out of path
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App/>); //component as jsx element
//Pet-capital P is imp for react to recognize it as component and render likewise
//name,animal,breed -props to be passed down