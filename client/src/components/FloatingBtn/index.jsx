/* eslint-disable react/prop-types */
import './index.css';
import { useEffect } from 'react';

function FloatingButton({ setShowAddPostModal, makeButtonDisappear, setMakeButtonDisappear }) {


    useEffect(() => {
        if (makeButtonDisappear) {
            setTimeout(() => setShowAddPostModal(true), 200)
        }
    }, [makeButtonDisappear, setShowAddPostModal])



    return (
        <p
            onClick={() => setMakeButtonDisappear(true)}
            className={`add-post-floating-btn  ${makeButtonDisappear ? 'remove-floating-button' : ''}`}
        >+</p>


    )
}

export default FloatingButton;