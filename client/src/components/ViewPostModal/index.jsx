/* eslint-disable react/prop-types */
import { IoMdSend } from 'react-icons/io'
import { useEffect, useState } from 'react';
import  formatDate  from '../../utils/formatDate'
import './index.css';

function ViewPostModal({ triggerModal, postId }) {

    console.log(postId)

    const [postData, setPostData] = useState(null);


    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const { data } = await rawData.json();
            if (data?.username) {
                setIsUserLoggedIn(true)
            }
        }
        async function getSinglePost() {
            const rawData = await fetch(`/api/posts/getSinglePost/${postId}`);
            const response = await rawData.json();
            // console.log(response)
            setPostData(response)
        }
        getSinglePost();
        getUserData();
    }, [postId])

    console.log(postData)

    const [commentText, setCommentText] = useState('')
    async function addComment() {
        try {
            const data = await fetch('/api/user/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    commentText,
                    postId,
                })
            })
            const response = await data.json();
            console.log(response)
        } catch (err) {
            console.log('comment not added ', err)
        }

    }

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

                    {postData && postData?.Comments.map((comment, index) => {
                        return (
                            <div key={index} className='single-comment-div'>
                                <div className='user-comment-info'>
                                    <div className='flex-box'>
                                        <figure><img src='/logo.png' width={23} alt='user profile picture' className='profile-pic' /> </figure>
                                        <div>
                                            <p>{comment?.User?.username}</p>
                                            <p>{formatDate(comment?.createdAt)}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='single-comment'>{comment.commentText}</p>
                            </div>
                        )
                    })}
                </div>


                {/* only show reply box if user is logged in */}
                {isUserLoggedIn ?
                    <div className='reply-textarea-div'>
                        <textarea
                            className='reply-textarea'
                            type='text'
                            placeholder='reply...'
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <p onClick={addComment} className='send-icon'><IoMdSend /></p>
                    </div>
                    :
                    <p>Sign in to add a reply</p>
                }



            </div>
        </section>
    )
}

export default ViewPostModal;