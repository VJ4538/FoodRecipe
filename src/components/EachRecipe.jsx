import React from 'react'
import {Link} from "react-router-dom";

export default function EachRecipeRecipe(props) {
    return (
        <div className="food-item">
            <img className="food-img" src={props.recipe.image} alt={props.recipe.title}/>
            <Link to={`search/${props.recipe.id}`}>{props.recipe.title}</Link>
        </div>
    )
}

