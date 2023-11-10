import { NavLink } from "react-router-dom";
import MobileNav from "../MobileNav";
import Navigation from "../Navigation";
import './index.css'

function Header() {
    return (
        <header className="header">
            <NavLink to='/'>
                <img className="logo" src="/logo2.png"></img>
            </NavLink>
            
            <Navigation />
            <MobileNav />
        </header>
    )
}

export default Header;