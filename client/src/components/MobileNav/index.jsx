/* eslint-disable react/prop-types */
import NavLinks from "../NavLinks";
import { useState } from "react";
import { CgMenuRound, CgCloseO } from 'react-icons/cg';
import './index.css';

function MobileNav() {

    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const hamburgerIcon = <CgMenuRound className='hamburger' size='35px' color='#C69214' onClick={() => setIsMobileOpen(!isMobileOpen)} />
    const closeIcon = <CgCloseO className='hamburger' size='35px' color='#C69214' onClick={() => setIsMobileOpen(!isMobileOpen)} />

    function closeHamburger() {
        setIsMobileOpen(false)
    }

    return (
        <>
        <div onClick={closeHamburger} className={isMobileOpen ? 'clickable-mobile-backdrop-display' : '.clickable-mobile-backdrop-display-none'}></div>
        <nav className="mobile-nav">
            {isMobileOpen ? closeIcon : hamburgerIcon}
            {isMobileOpen &&
                <NavLinks
                    isMobile={true}
                    closeHamburger={closeHamburger}
                />
            }
        </nav>
        </>
    )
}

export default MobileNav;