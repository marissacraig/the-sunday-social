/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import './index.css'

function NavLinks({ closeHamburger, isMobile }) {

    function closeHamburgerMenu () {
        if(isMobile) {
            closeHamburger();
        }
    }
    return (
        <nav className='navLinks'>
            <ul>
                <li>
                    <NavLink to='/' onClick={closeHamburgerMenu}>
                        Home
                    </NavLink>
                    {/* <a href='/'>HomePage</a> */}
                </li>
                <li>
                    <NavLink to='/profile' onClick={closeHamburgerMenu}>
                        Profile
                    </NavLink>
                    {/* <a href='/profile'>Profile</a> */}
                </li>
                <li>
                    <NavLink to='/friends' onClick={closeHamburgerMenu}>
                        Messages
                    </NavLink>
                </li>
                <li>
                    <p>Login</p>
                </li>
                <li>
                    <p>Signup</p>
                </li>
            </ul>
        </nav>
    )
}

export default NavLinks;