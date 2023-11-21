/* eslint-disable react/prop-types */
import { FaSearch } from 'react-icons/fa'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { Image } from 'cloudinary-react';
import './index.css'

function FriendFinder({ setTriggerRefreshInFriends, triggerRefreshInFriends, userId}) {

    const [isFindingFriend, setIsFindingFriends] = useState(false)
    const [foundUsers, setFoundUsers] = useState(null)
    const inputEl = useRef(null);

    async function findMyFriends(value) {
        try {
            const data = await fetch(`/api/user/getUserFriends/${value}`);
            const response = await data.json()

            if (!response) {
                console.log('error');
                return;
            }
            setFoundUsers(response.friends)
        } catch (err) {
            console.log('error getting friends', err)
        }
    }

    async function findFriends(value) {
        if (value === '') {
            setFoundUsers(null);
            return;
        }
        try {
            const data = await fetch(`/api/user/searchNewFriends/${value}`);
            const response = await data.json();
            if (!response) {
                console.log('error')
                setFoundUsers(null)
            }
            setFoundUsers(response)
        } catch (err) {
            console.log(err)
        }
    }

    async function sendMessageToFriend(friendId) {
        try{
            // check to see if there is already a chat
            const data = await fetch(`/api/user/doesChatRoomExist/${userId}/${friendId}`);
            const response = await data.json();
            console.log('response', response)
        } catch(err) {
            console.log(err)
        }
    }


    useEffect(() => {
        inputEl.current.value = '';
        // only run findMy friends if we are in 
        if(!isFindingFriend) findMyFriends('');
    }, [isFindingFriend, triggerRefreshInFriends])



    async function sendFriendRequestHandler(friendId) {
        try {
            const data = await fetch('/api/user/sendFriendRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    friendId
                })
            })
            const response = await data.json();
            if (!response) {
                console.log('friendship not made')
            }
            setTriggerRefreshInFriends(!triggerRefreshInFriends)
            findFriends();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <aside className="friend-finder-aside">
            <div className='top-search-bar'>
                <div className="friend-search-option">
                    <h2 onClick={() => { setIsFindingFriends(false); setFoundUsers(null) }} className={isFindingFriend ? "" : "make-active"}>My Friends</h2>
                    {/* erase the finder of friends in  */}
                    <h2 onClick={() => { setIsFindingFriends(true); setFoundUsers(null) }} className={isFindingFriend ? "make-active" : ""}>Find Friends</h2>
                </div>

                {isFindingFriend ?
                    <div className='search-input-div'>
                        <input
                            type="text"
                            ref={inputEl}
                            className="search-friends-input"
                            onChange={(e) => findFriends(e.target.value)}
                        />
                        <FaSearch />
                    </div>
                    :
                    <div className='search-input-div'>
                        <input
                            ref={inputEl}
                            type="text"
                            className="search-friends-input"
                            onChange={(e) => findMyFriends(e.target.value)}
                        />
                        <FaSearch />
                    </div>
                }
            </div>


            {/* Search results for finding friends */}
            <div className="search-results">
                {foundUsers && foundUsers.map((user, index) => {
                    return (
                        <div key={index} className="single-friend">
                            <figure>
                                <Image width={28} alt='user profile picture' className='profile-pic' cloudName='dp6owwg93' publicId={user?.profilePic} />
                            </figure>
                            <div className="friend-info">
                                <p>{user.username}</p>
                                <div className='button-row'>
                                    {isFindingFriend ?
                                        <p onClick={() => sendFriendRequestHandler(user.id)}>Send Friend Request</p>
                                        :
                                        <>
                                            <a onClick={() => sendMessageToFriend(user.id)}>
                                                Message
                                            </a>
                                            <Link to={`/friendProfile/${user.id}`}>
                                                Profile
                                            </Link>
                                             <p>
                                                Delete
                                            </p>
                                        </>
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

export default FriendFinder;