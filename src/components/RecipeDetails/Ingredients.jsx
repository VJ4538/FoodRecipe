import React from 'react'

export default function Ingredients(props) {
    return (
        <div className="Ingredients">
            <h1 className="recipe-block-title">Ingredients</h1>
           {props.foodData.extendedIngredients.map((eachI)=>{
               return(<li className="Ingredient-item" key={eachI.id}>{eachI.original} </li>)
           })}
        </div>
    )
}
