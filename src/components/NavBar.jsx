import React from 'react'
import {Link} from "react-router-dom";
import Logo from "./Home/Logo.png";

export default function NavBar(props) {
    return (
        <div className="nav-bar">
            <img className="logo" src={Logo} alt="Logo"/>
           {props.home&&<Link to="/">Home</Link>}
           {props.search&& <Link to="/search">Search</Link>}
           {props.random&& <Link to="/random">Random</Link>}
        </div>
    )

}
