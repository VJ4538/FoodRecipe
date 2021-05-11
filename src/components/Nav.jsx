import React from 'react'
import {Link} from "react-router-dom";
import Logo from "./Home/Logo.png";

export default function Nav() {
    const linkstyle={

        textDecoration: "none",
    }
    return (
        <div className="nav-box">
           <img className="logo" src={Logo} alt="LOGO"/>
            <Link to="/search" style={linkstyle}><p>Search</p></Link>
            <Link to="/random" style={linkstyle}><p>Feeling Luckly</p></Link>
        </div>
    )
}
