/* eslint-disable react/prop-types */
import { IoMdSend } from 'react-icons/io'
import './index.css';


function AddPostModal({ setMakeButtonDisappear, setShowPostModal }) {


    function postHandler(e) {
        e.preventDefault();
        console.log('item has been posted')
    }

    return (
        <div onClick={() => {setMakeButtonDisappear(false); setShowPostModal(false)}} className='modal-container'>
            <div onClick={(e) => e.stopPropagation()} className='modal'>
                <form onSubmit={(e) => postHandler(e)}>
                    <div className='post-form-textarea-div'>
                        <textarea
                            className='post-form-textarea'
                            type='text'
                            placeholder='what&apos;s going on...'
                        />
                        <p className='send-icon'><IoMdSend onClick={postHandler} /></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPostModal;