/* eslint-disable react/prop-types */
import AddPostModal from "../components/AddPostModal";
import FloatingButton from "../components/FloatingBtn";
import Post from "../components/Post";
import EditProfileModal from "../components/EditProfileModal";
import { useEffect, useState } from "react";

function ProfilePage() {
    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [makeButtonDisappear, setMakeButtonDisappear] = useState(false);
    const [triggerRefresh, setTriggerRefresh] = useState(false)
    const [userPosts, setUserPosts] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)

    useEffect(() => {
        async function getPosts() {
            try{
                const data = await fetch('/api/user/getPosts');
                const response = await data.json();
                setUserPosts(response)
            }
            catch(err) {
                console.log(err)
            }
        }
        getPosts()
    }, [showAddPostModal, triggerRefresh])


    return (
        <>
        <h1 className="page-heading">Profile</h1>
            {/* FLOATING BUTTON */}
            {showAddPostModal &&
                <AddPostModal
                    setShowPostModal={setShowAddPostModal}
                    setMakeButtonDisappear={setMakeButtonDisappear}

                />
            }

            {showEditModal && 
                <EditProfileModal 
                    setShowModal={setShowEditModal}

                />
            }
            <FloatingButton
                setShowAddPostModal={setShowAddPostModal}
                setMakeButtonDisappear={setMakeButtonDisappear}
                makeButtonDisappear={makeButtonDisappear}
                showAddPostModal={showAddPostModal}
            />
            {/* User Info */}
            <h2 className="section-heading"><span>User Info</span></h2>

            <section className="profile-stats-main-section">
                <div className="user-profile-image-bio">
                    <img src="/logo.png" className="user-profile-image" />
                    <h3>Headline</h3>
                    <p className="user-bio">1234 56789 1234 56789 1234 56789 12345 6789 1234 56789 1234 56789 1234 56789 1234 5678 </p>

                    <h3>Website:</h3>
                    <a className="view-work-link" href={'#' }>View my work</a>
                </div>

                <div className="user-stats">
                    <button className="edit-profile-btn" onClick={() => setShowEditModal(true)}>edit</button>
                    <h3>Searchable Qualities</h3>  
                    <p>Username: <span>tony</span></p>
                    <p>Email: <span>tony@gmail.com</span></p>
                    <p>Relationship Status: <span>Married</span></p>
                    <p>School: <span>USCD</span></p>
                    <p>Work: <span>edX</span></p>
                    <p>Currently Learning: <span>React.js</span></p>
                    <p>Pet Peeve: <span>uneven tables</span></p>
                </div>
            </section>

            {/* User Posts */}
            <h2 className="section-heading"><span>My Posts</span></h2>
            {userPosts && 
                userPosts.map((post, index) => {
                    return (
                        <Post 
                            key={index}
                            postId={post.id}
                            isInUserProfile={true}
                            setTriggerRefresh={setTriggerRefresh}
                            triggerRefresh={triggerRefresh}
                        />
                    )
                })
            }
        </>
    )

}

export default ProfilePage;

// name
// location
// currently learning
// strongest language
// relationship status
// Bio

