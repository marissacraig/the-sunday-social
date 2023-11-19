import { useState } from "react";
import CreateChatModal from "../components/CreateChatModal";
import AddPostModal from "../components/AddPostModal";
import FloatingButton from "../components/FloatingBtn";

function Messages() {
    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [makeButtonDisappear, setMakeButtonDisappear] = useState(false);
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);

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

            <FloatingButton
                setShowAddPostModal={setShowAddPostModal}
                setMakeButtonDisappear={setMakeButtonDisappear}
                makeButtonDisappear={makeButtonDisappear}
                showAddPostModal={showAddPostModal}
            />

            <button className="submit-btn" onClick={() => setShowCreateChatModal(true)}>New Chat+</button>


        </main>


    )
}

export default Messages;