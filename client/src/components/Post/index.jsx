import { useState } from 'react';
import PostModal from '../PostModal';
import { BiLike } from 'react-icons/bi'
import './index.css';

function Post() {

    let newDate = new Date();
    newDate = newDate.toLocaleDateString();

    const [showModal, setShowModal] = useState(false)

    return (
        <>
            {showModal && 
                <PostModal 
                    triggerModal={setShowModal}
                />
            
            }

            <section onClick={() => setTimeout(() => setShowModal(true), 150)} className="post-section">
                <div className="post-header">
                    <div className='flex-box-sa'>
                        <figure><img src='/logo.png' width={28} alt='user profile picture' className='profile-pic'/> </figure>
                        <p>anthony_bar</p>
                    </div>
                    <p>{newDate}</p>
                </div>
                <div className="post-body">
                    <h3>I got a new Job!</h3>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>
                <div className="post-footer">
                    <p>12 comments</p>
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