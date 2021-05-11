import React from 'react'

export default function CookingInstruction(props) {

    function done(e){
        let target=e.target.parentElement;
        target.classList.toggle("line-through");
    }
    return (
        <div className="cooking-instruction">
           <h1 className="recipe-block-title">Cooking Instructions</h1>
           {props.instruction.analyzedInstructions.length!==0?
            <ol>
            {props.instruction.analyzedInstructions[0].steps.map((each)=>{
                return <li><input type="checkbox" onChange={done}></input>{each.step}</li>
            })}
            </ol>
           :<p>There is no instruction returned from spoonacular</p>}

        </div>

    )
}
