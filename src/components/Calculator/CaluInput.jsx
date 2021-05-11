import React from 'react'

export default function CaluInput(props) {
  
    return (
        <div>
        <label>{props.name}:</label>
        <br/>
            <input id={props.title} type={props.type} name={props.title} placeholder={props.placeholder}></input>
        </div>
    )
}
