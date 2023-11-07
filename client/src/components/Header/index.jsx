import { NavLink } from "react-router-dom";
import MobileNav from "../MobileNav";
import Navigation from "../Navigation";
import './index.css'

function Header() {
    return (
        <header className="header">
            <NavLink to='/'>
                <img src="/vite.svg"></img>
            </NavLink>
            
            <Navigation />
            <MobileNav />
        </header>
    )
}

export default Header;