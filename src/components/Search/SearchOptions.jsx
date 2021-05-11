import React from 'react'

export default function SearchOptions(props) {
    return (
        <div className="searchOption">
            <select className="searchSelect" name={props.type} onChange={props.handleType}>
                <option>none</option>
                <option>min</option>
                <option>max</option>
            </select>
            <input className="searchInput" onChange={props.handle} name={props.type} type="number" required/>
            <p className="searchLabel">{props.name}/g</p>
        </div>
    )
}
