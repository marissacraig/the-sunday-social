/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import FloatingButton from "../components/FloatingBtn";
import Post from "../components/Post";
import AddPostModal from "../components/AddPostModal";

function HomePage() {

    const [userData, setUserData] = useState(null);

    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [makeButtonDisappear, setMakeButtonDisappear] = useState(false);
    const [allPosts, setAllPosts] = useState(null);


    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const { data } = await rawData.json();
            setUserData(data);
        }

        async function getAllPosts() {
            const rawData = await fetch('/api/home');
            const allPostData = await rawData.json();
            setAllPosts(allPostData);
        }
        getUserData();
        getAllPosts();

    }, [showAddPostModal])

    return (
        <>
            {userData &&
                <p className="homepage-greeting">Hello, {userData.username}. Let&apos;s get social...</p>
            }
            <h1 className="page-heading">The Sunday Feed</h1>


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


            {/* ALL POSTS */}

            {allPosts &&
                allPosts.map((post, index) => {
                    return (
                        <Post
                            postData={post}
                            key={index}
                        />
                    )
                })
            }

        </>
    )
}

export default HomePage;