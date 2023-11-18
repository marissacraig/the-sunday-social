import { useState, useEffect } from 'react'
import { Image } from 'cloudinary-react';
import './index.css'

function FriendRequests() {

    const [allIncomingRequests, setAllIncomingRequests] = useState([])
    async function getMyFriendRequests() {
        try {
            const incomingRequestRaw = await fetch(`/api/user/getIncomingFriendRequests`);
            let incomingRequests = await incomingRequestRaw.json();

            // add meta data to incoming so we know which button to show in the UI
            // I don't have to do this to outgoing because it will be false by default
            await incomingRequests?.Requesters.forEach(request => {
                request.incoming = true
            });

            const outgoingRequestRaw = await fetch(`/api/user/getOutgoingFriendRequests`);
            const outgoingRequests = await outgoingRequestRaw.json();

            if (!incomingRequests || !outgoingRequests) {
                throw new Error('error getting friend requests')
            }
            // combine all the request. Incoming have metadata to conditionally rendaer
            setAllIncomingRequests(incomingRequests.Requesters.concat(outgoingRequests.Requestees))
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getMyFriendRequests()
    }, [])




    async function addFriendHandler(friendId, requestId) {
        try {
            const data = await fetch('/api/user/addFriend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    friendId,
                    requestId
                })
            })
            const response = await data.json();
            if (!response) {
                console.log('friendship not made')
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <aside className="friend-finder-aside">
            <div className='top-search-bar'>
                <h2>Friend Requests</h2>
            </div>

            {/* Search results for finding friends */}
            <div className="search-results">
                {allIncomingRequests && allIncomingRequests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((user, index) => {
                    return (
                        <div key={index} className="single-friend">
                            <figure>
                                <Image width={28} alt='user profile picture' className='profile-pic' cloudName='dp6owwg93' publicId={user?.profilePic} />
                            </figure>
                            <div className="friend-info">
                                <p>{user.username}</p>
                                <div className='button-row'>
                                    {user?.incoming ?
                                        <p onClick={() => addFriendHandler(user.id, user.FriendRequest.id)}>Accept</p>
                                        :
                                        <p>Pending...</p>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </aside>
    )
}

export default FriendRequests;

// requesteee 3
// requesterr 2