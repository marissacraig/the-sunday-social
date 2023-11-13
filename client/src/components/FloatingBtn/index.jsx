/* eslint-disable react/prop-types */
import { IoAddCircleSharp} from 'react-icons/io5'
import './index.css';
import { useEffect } from 'react';

function FloatingButton({ setShowAddPostModal, makeButtonDisappear, setMakeButtonDisappear }) {


    useEffect(() => {
        if (makeButtonDisappear) {
            setTimeout(() => setShowAddPostModal(true), 200)
        }
    }, [makeButtonDisappear, setShowAddPostModal])



    return (
        // <IoAddCircleSharp
        //     onClick={() => setMakeButtonDisappear(true)}
        //     className={`add-post-floating-btn  ${makeButtonDisappear ? 'remove-floating-button' : ''}`}
        //     color="#FFCD00"
        // />

        <p
        onClick={() => setMakeButtonDisappear(true)}
         className={`add-post-floating-btn  ${makeButtonDisappear ? 'remove-floating-button' : ''}`}
        >+</p>

    
    )
}

export default FloatingButton;