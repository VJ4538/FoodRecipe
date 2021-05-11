import React,{useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import CookingInstruction from "./CookingInstruction";
import Ingredients from "./Ingredients";
import RecipeTitle from "./RecipeTitle";
import RecipeNutritions from "./RecipeNutritions";
import RecipeSummary from "./RecipeSummary";
import axios from 'axios';


 export default function RecipeDetailPage(props) {

    //Put use Effect in loading mode
    const [isLoading, setLoading] = useState(true);

    //state to store recipe with id
    const [recipe, setRecipe]=useState();
    const url=`https://api.spoonacular.com/recipes/${props.id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`;
    
    useEffect(()=>{
      // console.log(props.id);
      //check if origin is from random page or seach page
      if(props.id!==undefined){
        // if id not defined fetch data;
        console.log(url);
        axios.get(url).then(response=>{
          setRecipe(response.data)
          setLoading(false);
        })
        .catch((err)=>{
          alert(`Status:${err.response.data.status}  Code:${err.response.data.code}   Message:${err.response.data.message}`)
      })
      }else{
        console.log("food");
        setRecipe(props.foodData);
        setLoading(false);
      }

    },[]);

      if(isLoading){
        return (<div> Loading ... <button className="button-default back"><Link to="/random">Back</Link></button></div>)
      }
 
    return (
      <div className="recipe-detail-container" style={!props.random?{padding:"5% 5rem"}:{}}>
      <div className="recipe-detail">
       {/* {!props.random&&<button className="button-default back"><Link to="/random">Back</Link></button>} */}

        {!props.random &&<button className="button-default back"><Link to="/search">Back</Link></button>}
        <div className="recipe-summary-container"> 
         <RecipeTitle foodData={props.random?props.foodData:recipe}/>
         <Ingredients foodData={props.random?props.foodData:recipe}/>
         {/* {!props.random&&<RecipeNutritions foodData={props.random?props.foodData:recipe}/> } */}
         </div> 
         <RecipeSummary foodData={props.random?props.foodData:recipe} />
         <CookingInstruction instruction={props.random?props.foodData:recipe} /> 
      </div> 
      </div>
  )
     
}


