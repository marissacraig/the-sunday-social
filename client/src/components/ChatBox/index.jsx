/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { formatDateShortYear } from "../../utils/formatDate";
import { getTime } from "../../utils/formatDate";
import { IoMdSend } from 'react-icons/io'
import './index.css'

function ChatBox({ username }) {

    const { chatId } = useParams();

    const [chatRoom, setChatroom] = useState(null);
    const [allMessages, setAllMessage] = useState(null);

    useEffect(() => {
        async function getChatRoom() {
            try {
                const data = await fetch(`/api/user/getChatRoom/${chatId}`);
                const response = await data.json();
                setChatroom(response)
            } catch (err) {
                console.log('error getting room ', err)
            }
        }
        async function getMessages() {
            try {
                const data = await fetch(`/api/user/getChatMessages/${chatId}`)

                const response = await data.json();

                console.log('messages', response);
                setAllMessage(response);
            } catch (err) {
                console.log('error getting messages ', err)
            }
        }
        getChatRoom()
        getMessages();
    }, [])


    async function addMessage() {
        try{
            // const data = await 
        } catch(err) {
            console.log(err)
        }
    }



    return (
        <section className="chatbox-main-section">
            <aside className="chatbox-aside">
                <ul>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li><li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                    <li>Mike</li>
                </ul>
            </aside>
            <div className="message-text-screen">
                {allMessages && allMessages.map((message, index) => {
                    return (
                        <div key={index} className={`${message.sender === username ? 'message-justify-right' : 'message-justify-left'}`}>
                            <div className={`message-bubble ${message.sender === username ? 'outgoing-message-bubble' : 'incoming-message-bubble'}`}>
                                <p>{message.messageText}</p>
                                <div className="sender-info-div">
                                    <p>{message.sender}</p>
                                    {/* <p>{formatDateShortYear(message.createdAt)}</p> */}
                                </div>
                                <div className="message-timestamp">
                                    <p>{getTime(message.createdAt)}</p>
                                    <p>{formatDateShortYear(message.createdAt)}</p>
                                </div>
                            </div>

                        </div>
                    )
                })}
                {/* text input */}
                <div className="type-message-div">
                    <textarea/>
                    <p className='send-icon'><IoMdSend onClick={addMessage} /></p>
                </div>
            </div>
        </section>
    )

}

export default ChatBox;