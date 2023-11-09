/* eslint-disable react/prop-types */
import './index.css'

function PostModal({ triggerModal }) {


    return (
        <section className='modal-container'>
            <div className='modal'>
            <p onClick={() => triggerModal(false)}>X</p>
            <p>hello there</p>
            </div>
        </section>
    )
}

export default PostModal;