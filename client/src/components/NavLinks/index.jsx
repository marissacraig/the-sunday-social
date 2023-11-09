/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import './index.css'

function NavLinks({ closeHamburger, isMobile }) {


    const activeLinkStyle = {
        color: '#FFCD00'
    }
    const nonActiveLink = {
        color: '#e9dede'
    }

    function closeHamburgerMenu() {
        if (isMobile) {
            closeHamburger();
        }
    }
    return (
        <nav className='navLinks'>
            <ul>
                <li>
                    <NavLink
                        to='/'
                        onClick={closeHamburgerMenu}
                        style={({ isActive }) => isActive ? activeLinkStyle : nonActiveLink}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/profile'
                        onClick={closeHamburgerMenu}
                        style={({ isActive }) => isActive ? activeLinkStyle : nonActiveLink}
                    >
                        Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/friends'
                        onClick={closeHamburgerMenu}
                        style={({ isActive }) => isActive ? activeLinkStyle : nonActiveLink}
                    >
                        Messages
                    </NavLink>
                </li>
                <li>
                    <p>Login</p>
                </li>
            </ul>
        </nav>
    )
}

export default NavLinks;