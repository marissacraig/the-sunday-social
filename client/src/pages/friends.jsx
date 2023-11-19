import { useState } from "react";
import AddPostModal from "../components/AddPostModal";
import FloatingButton from "../components/FloatingBtn";
import FriendFinder from "../components/FriendFinder";
import FriendRequests from "../components/FriendRequests";

function FriendPage() {

    // these two use state variable are paired with the floating button
    const [showAddPostModal, setShowAddPostModal] = useState(false)
    const [makeButtonDisappear, setMakeButtonDisappear] = useState(false);
    const [triggerRefreshInFriends, setTriggerRefreshInFriends] = useState(false)

    return (
        <main>
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
                showAddPostModal={showAddPostModal} />

            <main className="friend-page-main">
                <FriendFinder
                    setTriggerRefreshInFriends={setTriggerRefreshInFriends}
                    triggerRefreshInFriends={triggerRefreshInFriends}
                />

                <FriendRequests
                    setTriggerRefreshInFriends={setTriggerRefreshInFriends}
                    triggerRefreshInFriends={triggerRefreshInFriends}
                />
            </main>



            <p>Messaging needs to work</p>

            <p>Allowed to send on message with request</p>
            <p>case insensitivity searches</p>
            <p>When user puts a new image, old one is erased</p>
            <p>have view profile work</p>
            <p>Most talkedabout and most liked</p>
            <p>Set up messages</p>
            <p>Have message button work in friends</p>
            <p>Socket Io for automatic refresh and notfications</p>




        </main>

    )
}

export default FriendPage;