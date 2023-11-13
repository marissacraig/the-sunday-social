/* eslint-disable react/prop-types */
import { IoMdSend } from 'react-icons/io'
import { useEffect, useState } from 'react';
import './index.css'

function ViewPostModal({ triggerModal, postData }) {


    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const { data } = await rawData.json();
            if (data?.username) {
                setIsUserLoggedIn(true)
            }
        }
        getUserData();
    }, [])

    return (
        <section onClick={() => triggerModal(false)} className='modal-container'>
            <div onClick={(e) => e.stopPropagation()} className='modal'>
                <div className='post-modal-user-info'>
                    <div className='flex-box'>
                        <figure><img src='/logo.png' width={33} alt='user profile picture' className='profile-pic' /> </figure>
                        <div>
                            <p>anthony_bar</p>
                            <p>11/2/23</p>
                        </div>
                    </div>
                </div>
                <p className='post-modal-text'>{postData?.postText}</p>

                <div className='comment-section-div'>
                    <div className='single-comment-div'>
                        <div className='user-comment-info'>
                            <div className='flex-box'>
                                <figure><img src='/logo.png' width={23} alt='user profile picture' className='profile-pic' /> </figure>
                                <div>
                                    <p>anthony_bar</p>
                                    <p>11/2/23</p>
                                </div>
                            </div>
                        </div>
                        <p className='single-comment'>this is awesome! I can&apos;t wait to see wha t you do. I wish you the best of luck</p>
                    </div>


                    <div className='single-comment-div'>
                        <div className='user-comment-info'>
                            <div className='flex-box'>
                                <figure><img src='/logo.png' width={23} alt='user profile picture' className='profile-pic' /> </figure>
                                <div>
                                    <p>anthony_bar</p>
                                    <p>11/2/23</p>
                                </div>
                            </div>
                        </div>
                        <p className='single-comment'>this is awesome! I can&apos;t wait to see wha t you do. I wish you the best of luck</p>
                    </div>
                </div>


                {/* only show reply box if user is logged in */}
                {isUserLoggedIn ? 
                <div className='reply-textarea-div'>
                    <textarea
                        className='reply-textarea'
                        type='text'
                        placeholder='reply...'
                    />
                    <p className='send-icon'><IoMdSend /></p>
                </div>
                :
                <p>Sign in to add a reply</p>
                }



            </div>
        </section>
    )
}

export default ViewPostModal;