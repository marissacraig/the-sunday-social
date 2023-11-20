/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { IoHome,  } from 'react-icons/io5'
import { BiSolidMessage } from 'react-icons/bi'
import { FaUserFriends } from 'react-icons/fa'
import LoginModal from '../LoginModal';
import { Image } from 'cloudinary-react';
import './index.css'

function NavLinks({ closeHamburger, isMobile, triggerRefreshAmongPages }) {

    const activeLinkStyle = {
        color: '#FFCD00'
    }

    function closeHamburgerMenu() {
        if (isMobile) {
            closeHamburger();
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const data = await rawData.json();
            setUserData(data);
        }
        getUserData();
    }, [triggerRefreshAmongPages])

    return (
        <>
            {showModal && <LoginModal setShowModal={setShowModal} />}
            {userData?.profilePic ?
                <nav className='navLinks'>
                    <ul>
                        <li>
                            <NavLink
                                to='/'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                <IoHome />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/messages/1'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                <BiSolidMessage />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/friends'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                                <FaUserFriends />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/profile'
                                onClick={closeHamburgerMenu}
                                style={({ isActive }) => isActive ? activeLinkStyle : {}}
                            >
                            <Image className='profile-pic-in-nav' cloudName='dp6owwg93' publicId={userData?.profilePic} />
                            </NavLink>
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