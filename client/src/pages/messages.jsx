import { useState } from "react";
import AddPostModal from "../components/AddPostModal";
import FloatingButton from "../components/FloatingBtn";

function Messages() {
    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [makeButtonDisappear, setMakeButtonDisappear] = useState(false);
    
    return (
        <main>
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
        </main>


    )
}

export default Messages;