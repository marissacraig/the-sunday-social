/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './index.css';
import { ToastContainer, toast } from "react-toastify";
import { Image } from 'cloudinary-react';

function CreateChatModal({ triggerModal }) {

    const showToastMessage = (errorMsg, toastId) => {
        toast.error(errorMsg, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            closeOnClick: true,
            className: 'toast-message',
            toastId: toastId
        });
    };


    const [myFriends, setMyFriends] = useState(null)
    const [userIdsForChatRoom, setUsersIdsForChatRoom] = useState([])

    async function findMyFriends(value = '') {
        try {
            const data = await fetch(`/api/user/getUserFriends/${value}`);
            const response = await data.json()

            if (!response) {
                console.log('error');
                return;
            }
            setMyFriends(response?.friends)
        } catch (err) {
            console.log('error getting friends', err)
        }
    }

    useEffect(() => {
        findMyFriends()
    }, [])

    


    async function makeChatRoom(e) {
        e.preventDefault();
        if (userIdsForChatRoom.length === 0) {
            showToastMessage('Please select recipient(s)')
            return;
        }
        try {
            const data = await fetch('/api/user/createChatRoom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userIdsForChatRoom,

                })
            })
            const response = await data.json();
            if(!response) {
                console.log('error')
            }
            triggerModal(false);
        } catch (err) {
            console.log(`error making room `, err)
        }
    }

    function addUserIdHandler(e) {
        // remove any undefined
        if(e.target.value === undefined) return;
        // remove item if it is already in the arry
        if (userIdsForChatRoom.includes(e.target.value)) {
            setUsersIdsForChatRoom(prevArrary => prevArrary.filter(item => item !== e.target.value))
        // else add it to the array
        } else {
            setUsersIdsForChatRoom(prevArrary => [...prevArrary, e.target.value])
        }
    }

    return (
        <section onClick={() => { triggerModal(false) }} className='modal-container'>
            <ToastContainer />
            <div onClick={(e) => e.stopPropagation()} className='no-padding-modal'>
                <h3 className="modal-title">Select Friends</h3>
                <form onSubmit={(e) => makeChatRoom(e)}>
                    {myFriends && myFriends.map((user, index) => {
                        return (
                            <label htmlFor={`single-friend${index}`} key={index} onClick={(e) => addUserIdHandler(e)} className="single-chat-friend">
                                <div className="friend-name-pic-chatlist">
                                    <figure>
                                        <Image alt='user profile picture' className='profile-pic-in-chat-modal' cloudName='dp6owwg93' publicId={user?.profilePic} />
                                    </figure>
                                    <p>{user.username}</p>
                                </div>
                                <input
                                    id={`single-friend${index}`}
                                    type="checkbox"
                                    value={user.id}
                                />
                            </label>
                        )
                    })}
                    <button type="submit" className='submit-btn create-chat-btn'>Create Chat</button>
                </form>
            </div>
        </section>
    )
}

export default CreateChatModal;