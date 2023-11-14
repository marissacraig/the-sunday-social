/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ViewPostModal from '../ViewPostModal';
import { BiLike } from 'react-icons/bi'
import formatDate from '../../utils/formatDate'
import './index.css';

function Post({ postId }) {
    const [showModal, setShowModal] = useState(false)
    const [postData, setPostData] = useState(null)
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        async function getPost() {
            try{
                const data = await fetch(`/api/posts/getSinglePost/${postId}`);
                const response = await data.json();
                setPostData(response)
            } catch(err) {
                console.log('could not get post ', err)
            }
        }
        getPost();
    }, [postId, refresh])

    async function addLike(e) {
        e.stopPropagation();
        try {
            const data = await fetch('/api/user/addLike', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    postId: postData.id
                })
            })
            const response = await data.json();
            if (response) {
                setRefresh(!refresh)
            }
        } catch (err) {
            console.log(err)
        }
    }

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
                        <figure><img src='/logo.png' width={28} alt='user profile picture' className='profile-pic' /> </figure>
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
                        <p>{postData?.Likes?.length}</p>
                        <p onClick={(e) => addLike(e)}><BiLike /></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Post;