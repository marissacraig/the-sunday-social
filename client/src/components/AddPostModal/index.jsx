/* eslint-disable react/prop-types */
import { IoMdSend } from 'react-icons/io'
import { useState, useRef } from 'react';
import './index.css';


function AddPostModal({ setMakeButtonDisappear, setShowPostModal }) {

    const [postText, setPostText] = useState('');
    const errorText = useRef(null);

    async function postHandler(e) {
        e.preventDefault();
        if (postText.trim() === '') return errorText.current.innerHTML = 'add text to post'
        try {
            const data = await fetch('/api/user/addPost', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postText
                })
            })
            const response = await data.json();
            if (!response) {
                errorText.current.innerHTML = 'oops, an error occurred'
            } else {
                setShowPostModal(false)
                setMakeButtonDisappear(false)
            }

        } catch(err) {
            console.log(err)
        }

    }

    return (
        <div onClick={() => {setMakeButtonDisappear(false); setShowPostModal(false)}} className='modal-container'>
            <div onClick={(e) => e.stopPropagation()} className='modal'>
                    <h3 className='modal-title'>Add Post</h3>
                    <div className='post-form-textarea-div'>
                        <textarea
                            className='post-form-textarea'
                            type='text'
                            onChange={((e) => {setPostText(e.target.value); errorText.current.innerHTML = ''})}
                            placeholder='what&apos;s going on...'
                        />
                        <p className='send-icon'><IoMdSend onClick={postHandler} /></p>
                    </div>

                    <p className='error-text-post-form' ref={errorText}></p>
            </div>
        </div>
    )
}

export default AddPostModal;