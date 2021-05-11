import React from 'react'

export default function RecipeSummary(props) {
    return (
        <div >
              <h1 className="recipe-block-title">{props.foodData.title}</h1>
              <img  className="recipe-image"src={props.foodData.image} alt={props.foodData.title}/>
        </div>
    )
}
