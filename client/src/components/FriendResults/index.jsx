import { FaSearch } from 'react-icons/fa'
import { useState } from 'react'
import './index.css'

function FriendResults() {

    const [isFindingFriend, setIsFindingFriends] = useState(false)

    return (
        <aside className="friend-finder-aside">

            <div className='top-search-bar'>

                <div className="friend-search-option">
                    <h2 onClick={() => setIsFindingFriends(false)} className={isFindingFriend ? "" : "make-active"}>All Friends</h2>
                    <h2 onClick={() => setIsFindingFriends(true)} className={isFindingFriend ? "make-active" : ""}>Find Friends</h2>
                </div>

                <div className='search-input-div'>
                    <input
                        type="text"
                        className="search-friends-input"
                    />
                    <FaSearch />
                </div>
            </div>

            <div className="search-results">

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>


                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>


                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>

                <div className="single-friend">
                    <figure><img width={50} src="/logo.png" /></figure>
                    <div className="friend-info">
                        <p>Kevin_Bar</p>
                        <div className='button-row'>
                            <p>Message</p>
                            <p>View Profile</p>
                            {/* <p>Friend Request</p> */}
                        </div>
                    </div>
                </div>



            </div>
        </aside>
    )
}

export default FriendResults;