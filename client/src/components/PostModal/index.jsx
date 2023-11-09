/* eslint-disable react/prop-types */
import './index.css'
import { IoMdSend } from 'react-icons/io'

function PostModal({ triggerModal }) {

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
                <h3 className='post-modal-title'>I got a new Job!</h3>
                <p className='post-modal-text'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>

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




                <div className='reply-textarea-div'>
                    <textarea
                        className='reply-textarea'
                        type='text'
                        placeholder='reply...'
                    />
                    <p className='send-icon'><IoMdSend /></p>
                </div>
            </div>
        </section>
    )
}

export default PostModal;