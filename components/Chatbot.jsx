import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import ChatBot from 'react-simple-chatbot';
import { IoIosChatbubbles } from "react-icons/io";

export default function Chatbot() {
    const [chatbotVisible, setChatbotVisible] = useState(false);

    const toggleChatbot = () => {
        setChatbotVisible(!chatbotVisible);
    };
    const chatbotStyle = {
        position: 'fixed',
        bottom: chatbotVisible ? 20 : -500, 
        right: 20,
        zIndex: 1000,
        transition: 'bottom 0.3s ease-in-out',
    };
    return (
        <div>
            <div onClick={toggleChatbot} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000, cursor: 'pointer' }}>
                <IoIosChatbubbles size={44} />
            </div>
            <div style={chatbotStyle}>
                {chatbotVisible && (
                    <ChatBot
                        steps={[
                            {
                                id: 'Greet',
                                message: 'Hello, Welcome to our website',
                                trigger: 'Ask Name',
                            },
                            {
                                id: 'Ask Name',
                                message: 'Please enter your name',
                                trigger: 'waiting1',
                            },
                            {
                                id: 'waiting1',
                                user: true,
                                trigger: 'email',
                            },
                            {
                                id: 'email',
                                message: 'Hi {previousValue}, Please write your Email',
                                trigger: 'waiting 2',
                            },
                            {
                                id: 'waiting2',
                                user: true,
                                trigger: 'issue',
                            },
                            {
                                id: 'issue',
                                message: 'Thanks for Providing Your Email, Please write your issue',
                                trigger: 'waiting 3',
                            },
                            {
                                id: 'waiting3',
                                user: true,
                                trigger: 'end',
                            },
                            {
                                id: 'end',
                                message: 'Thanks for writing your issue ,we will send you an email soon',
                                end: true,
                            },
                        ]}
                    />
                )}
            </div>
        </div>
    );
}