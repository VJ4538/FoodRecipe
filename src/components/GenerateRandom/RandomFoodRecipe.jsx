import React,{useEffect,useState} from 'react';
import NavBar from "../NavBar";
import axios from 'axios';
import RecipeDetailPage from "../RecipeDetails/RecipeDetailPage";

export default function RandomFoodRecipe() {
    //state to store random recipe
    const [randomRecipe, setRecipe]=useState();

    const [isLoading, setLoading] = useState(true);
    const url=`https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.REACT_APP_API_KEY}`;

    function generateRandom(url){
        setLoading(true);
        let offsetNumber = Math.floor(Math.random() * (1000 - 100));
        let offset =`&random=true&offset=${offsetNumber}`;
        // console.log(url);
        //send request
        axios.get(url+offset)
        .then(response=>{
                //set data ready
                setRecipe(response.data.recipes)
                //set loading false 
                setLoading(false);
              })
              .catch((err)=>{
                  //catch error
                  let data =err.response.data;
                  alert(`Status:${data.status}  Code:${data.code}   Message:${data.message}`)
              })
    }

    useEffect(()=>{
        //generate Random Recipe when page loaded
        //Uncomment this when using the app
        generateRandom(url)
        
      },[]);

    return (
        <div className="content-container">
            <NavBar home="t" search="t"/>
            <div className="generateRandom">
            <button className="button-default" onClick={()=>{
                generateRandom(url);
            }}>Generate a Random Recipe</button>
            </div>     
            
            {/* loading screen wait for data  */}
            {isLoading ?<p className="Loading">Loading...</p>
            :<RecipeDetailPage foodData={randomRecipe[0]} random={true}/>
            }
          
        </div>
    )
}
