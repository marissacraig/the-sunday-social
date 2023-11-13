/* eslint-disable react/prop-types */
import { IoMdSend } from 'react-icons/io'
import { useState } from 'react';
import './index.css';


function AddPostModal({ setMakeButtonDisappear, setShowPostModal }) {

    const [postText, setPostText] = useState('');

    async function postHandler(e) {
        e.preventDefault();

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
            console.log(response)

        } catch(err) {
            console.log(err)
        }

    }

    return (
        <div onClick={() => {setMakeButtonDisappear(false); setShowPostModal(false)}} className='modal-container'>
            <div onClick={(e) => e.stopPropagation()} className='modal'>
                    <div className='post-form-textarea-div'>
                        <textarea
                            className='post-form-textarea'
                            type='text'
                            onChange={((e) => setPostText(e.target.value))}
                            placeholder='what&apos;s going on...'
                            required
                        />
                        <p className='send-icon'><IoMdSend onClick={postHandler} /></p>
                    </div>
            </div>
        </div>
    )
}

export default AddPostModal;