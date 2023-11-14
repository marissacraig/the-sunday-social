/* eslint-disable react/prop-types */
import { useState } from 'react';
import ViewPostModal from '../ViewPostModal';
import { BiLike } from 'react-icons/bi'
import  formatDate  from '../../utils/formatDate'
import './index.css';

function Post({ postData }) {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            {showModal && 
                <ViewPostModal 
                    triggerModal={setShowModal}
                    postId={postData?.id}
                />
            }

            <section onClick={() => setTimeout(() => setShowModal(true), 200)} className="post-section">
                <div className="post-header">
                    <div className='flex-box-sa'>
                        <figure><img src='/logo.png' width={28} alt='user profile picture' className='profile-pic'/> </figure>
                        <p>{postData?.author}</p>
                    </div>
                    <p>{formatDate(postData?.createdAt)}</p>
                </div>
                <div className="post-body">
                    <p>{postData?.postText}</p>
                </div>
                <div className="post-footer">
                    <p>{postData?.Comments?.length}  
                        {postData?.Comments?.length > 1 ? ' comments' : ' comment'}
                    </p>
                    <div>
                        <p>4</p>
                        <p><BiLike /></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Post;