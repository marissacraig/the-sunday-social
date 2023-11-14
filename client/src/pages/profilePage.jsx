/* eslint-disable react/prop-types */
import AddPostModal from "../components/AddPostModal";
import FloatingButton from "../components/FloatingBtn";
import Post from "../components/Post";
import { useEffect, useState } from "react";

function ProfilePage() {
    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [makeButtonDisappear, setMakeButtonDisappear] = useState(false);

    const [userPosts, setUserPosts] = useState(null)

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
    }, [showAddPostModal])

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
            <FloatingButton
                setShowAddPostModal={setShowAddPostModal}
                setMakeButtonDisappear={setMakeButtonDisappear}
                makeButtonDisappear={makeButtonDisappear}
                showAddPostModal={showAddPostModal}
            />

            {/* User Posts */}
            {userPosts && 
                userPosts.map((post, index) => {
                    return (
                        <Post 
                            key={index}
                            postId={post.id}
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

