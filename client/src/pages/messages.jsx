import { useState, useEffect } from "react";
import CreateChatModal from "../components/CreateChatModal";
import ChatBox from "../components/ChatBox";
import AddPostModal from "../components/AddPostModal";

function Messages() {
    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        async function getUserData() {
            const rawData = await fetch('/api/user');
            const data = await rawData.json();
            setUserData(data);
        }

        getUserData();
    }, [showAddPostModal])

    console.log(userData)

    return (
        <main>
            {/* FLOATING BUTTON */}
            {showAddPostModal &&
                <AddPostModal
                    setShowPostModal={setShowAddPostModal}
                    setMakeButtonDisappear={setMakeButtonDisappear}

                />
            }

            {showCreateChatModal &&

            <CreateChatModal 
                triggerModal={setShowCreateChatModal}
            />

            }


            <button className="submit-btn" id="create-chatroom-btn" onClick={() => setShowCreateChatModal(true)}>New Chat+</button>


            <ChatBox 
                username={userData?.username}

            />
        </main>


    )
}

export default Messages;