/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModal';
import './index.css'

function NavLinks({ closeHamburger, isMobile }) {

    const navigate = useNavigate();

    const activeLinkStyle = {
        color: '#FFCD00'
    }

    const [triggerReload, setTriggerReload] = useState(false)

    function closeHamburgerMenu() {
        if (isMobile) {
            closeHamburger();
        }
    }

    const [showModal, setShowModal] = useState(false);
    async function handleLogout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST'
            });
            localStorage.removeItem('token');
            setTriggerReload(!triggerReload)
            navigate('/')
        } catch (err) {
            console.log('problem signing out', err)
        }
    }

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const { data } = await rawData.json();
            setUserData(data);
        }
        getUserData();
    }, [triggerReload])

    return (
        <>
            {showModal && <LoginModal setShowModal={setShowModal} />}
            {userData ?
                <nav className='navLinks'>
                    <ul>
                        <li>
                            <NavLink
                                to='/'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/profile'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/messages'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                Messages
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/friends'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                Friends
                            </NavLink>
                        </li>
                        <li>
                            <p onClick={handleLogout}>Logout</p>
                        </li>
                    </ul>
                </nav>
                :
                <nav className='navLinks'>
                    <ul>
                        <li>
                            <p onClick={() => setShowModal(true)}>Sign in</p>
                        </li>
                    </ul>
                </nav>
            }
        </>
    )
}

export default NavLinks;