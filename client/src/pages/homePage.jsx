/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FloatingButton from "../components/FloatingBtn";
import Post from "../components/Post";
import AddPostModal from "../components/AddPostModal";
import 'react-toastify/dist/ReactToastify.css';


function HomePage() {

    const [userData, setUserData] = useState(null);

    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [makeButtonDisappear, setMakeButtonDisappear] = useState(false);
    const [allPosts, setAllPosts] = useState(null);


    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const data = await rawData.json();
            setUserData(data);
        }

        async function getAllPosts() {
            const rawData = await fetch('/api/post/getAllPosts');
            const allPostData = await rawData.json();
            setAllPosts(allPostData);
        }
        getUserData();
        getAllPosts();

    }, [showAddPostModal])

    return (
        <main>
            {userData?.profilePic &&
                <>
                    <p className="homepage-greeting">Hello, {userData.username}. Let&apos;s get social...</p>
                    <FloatingButton
                        setShowAddPostModal={setShowAddPostModal}
                        setMakeButtonDisappear={setMakeButtonDisappear}
                        makeButtonDisappear={makeButtonDisappear}
                        showAddPostModal={showAddPostModal} />
                </>
            }
            {showAddPostModal &&
                <AddPostModal
                    setShowPostModal={setShowAddPostModal}
                    setMakeButtonDisappear={setMakeButtonDisappear}
                />
            }

            <h1 className="page-heading">The Sunday Feed</h1>

            {/* ALL POSTS */}
            {allPosts &&
                allPosts.map((post, index) => {
                    return (
                        <Post
                            postId={post?.id}
                            key={index}
                            isInUserProfile={false}
                        />
                    )
                })
            }

        </main>
    )
}

export default HomePage;