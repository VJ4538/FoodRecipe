import React from 'react'

export default function SelectOptions(props) {
    return (
        <div className="calcu-input">
        <label>{props.title}</label>
        <select id={props.id} name={props.id} >
            {props.options.map((eachOption)=>{
                return(
                <option key={props.keys} value={eachOption.value}>{eachOption.context}</option>
                )
            })}
        </select>
        </div>
    )
}
