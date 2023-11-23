/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom'
import { formatDateShortYear } from "../../utils/formatDate";
import { getTime } from "../../utils/formatDate";
import { IoMdSend } from 'react-icons/io'
import './index.css'

function ChatBox({ username, userId, triggerModalStatus }) {

    const navigate = useNavigate();
    const { chatId } = useParams();
    const [allMessages, setAllMessage] = useState(null);
    const [allChatrooms, setAllChatrooms] = useState(null);
    const [messageText, setMessageText] = useState('');

    const messageTextArea = useRef(null);

    async function getMessages() {
        try {
            const data = await fetch(`/api/user/getChatMessages/${chatId}`)
            const response = await data.json();
            setAllMessage(response);
        } catch (err) {
            console.log('error getting messages ', err)
        }
    }
    async function getChatrooms() {
        try {
            const data = await fetch(`/api/user/getAllChatrooms/${userId}`)
            const response = await data.json();
            setAllChatrooms(response);
        } catch (err) {
            console.log('error getting messages ', err)
        }
    }

    // open latest chat as soon as page loads
    if (!chatId && allChatrooms) {
        navigate(`/messages/${allChatrooms.ChatRoom[0].id}`)
    }


    useEffect(() => {
        getMessages();
        getChatrooms();
    }, [userId, chatId, triggerModalStatus])


    async function addMessage() {
        try {
            const data = await fetch('/api/user/createNewMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messageText,
                    chatroomId: chatId,
                    sender: username

                })
            });
            const response = data.json();
            if (!response) {
                console.log(' error sending message ')
            }
            setMessageText('');
            getMessages();
            scrollToBottom();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(scrollToBottom)

    // Function to scroll to the bottom
    function scrollToBottom() {
        if (messageTextArea.current) {
            messageTextArea.current?.scrollIntoView({ behavior: "auto" })
        }
    }

    return (
        <section className="chatbox-main-section">
            <aside className="chatbox-aside">
                <ul>
                    {/* sort the chat boxes by last updated so most relevant is on top */}
                    <a href="#" className="messages-title"><li>Messages</li></a>
                    {allChatrooms && allChatrooms?.ChatRoom?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((chatroom, index) => {
                        return (
                            <Link
                                className={`chat-aside-link ${chatId == chatroom.id ? 'active-chat' : ''}`}
                                key={index}
                                to={`/messages/${chatroom.id}`}
                            >
                                {/* Only show the names that aren't the logged in user */}
                                <li>{chatroom.chatRoomName.split(',').filter(item => item !== username).join(',')}</li>
                            </Link>
                        )
                    })}
                </ul>
            </aside>
            <div className="message-text-screen">
                <div className="text-messages-area">
                    {allMessages && allMessages.map((message, index) => {
                        return (
                            <div key={index} className={`${message.sender === username ? 'message-justify-right' : 'message-justify-left'}`}>
                                <div className={`message-bubble ${message.sender === username ? 'outgoing-message-bubble' : 'incoming-message-bubble'}`}>
                                    <p>{message.messageText}</p>
                                    <div className="sender-info-div">
                                        <p>{message.sender}</p>
                                    </div>
                                    <div className="message-timestamp">
                                        <p>{getTime(message.createdAt)}</p>
                                        <p>{formatDateShortYear(message.createdAt)}</p>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                    {/* I'll use this div to scroll to bottom */}
                    <div ref={messageTextArea}></div>
                </div>
                {/* text input */}
                <div className="type-message-div">
                    <form>
                        <textarea
                            value={messageText}
                            onKeyDown={(e) => { if (e.key === 'Enter') addMessage() }}
                            onChange={(e) => setMessageText(e.target.value)}
                        />
                        <p className='send-icon'><IoMdSend onClick={addMessage} /></p>
                    </form>
                </div>
            </div>
        </section>
    )

}

export default ChatBox;