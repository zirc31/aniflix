import React from 'react';
import { useState, useEffect, useRef, createContext } from 'react';
import axios from 'axios';
import { Box, Divider } from '@mui/material'
import ChatArea from '../components/ChatArea'
import ChatGroupAvatar from '../components/ChatGroupAvatar'
import ChatReceiver, { ChatSender } from '../components/ChatMessage'

import io from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_SOCKET_IO_SERVER_HTTP);

export const ChatContext = createContext();

const ChatRoom = ( props ) => {

    // enable for testing via params.
    // const queryParams = new URLSearchParams(window.location.search);
    // const queryRoomId = queryParams.get("roomId");
    // const queryUsername = queryParams.get("username");

    const [ message, setMessage ] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
    };

    // Chat
    const [ chatAvatar, setChatAvatar ] = useState('');
    const [ chatUsername, setChatUsername ] = useState('');
    const [ chatRoom, setChatRoom ] = useState( props.roomId );
    const [ chatList, setChatList ] = useState([]);

    const localToken = localStorage.getItem("aniflix_token");
    const getUserData = async () => {
        try {
            const endpointUrl = `http://localhost:8000/api/v1/user/data`;
            const response = await axios.get( endpointUrl, {
                headers: {
                'Authorization': `Bearer ${localToken}`
                }
            });
            // console.log(response.data.data);
            const userdata = response.data.data;

            // console.log(userdata.avatarImageUrl);
            // console.log(userdata.username);
            setChatAvatar(userdata.avatarImageUrl);
            setChatUsername(userdata.username);
        } catch (error) {
            console.error(error);
        };
    };
    getUserData();

    const messagesEndRef = useRef(null);

    // whenever chatList has been updated, chat window will auto scroll down.
    useEffect(() => {
        scrollToBottom();
    }, [chatList]);

    const joinRoom = () => {
        if( chatUsername !== '' && chatRoom !== ''  ) {
            // passed the room id to the backend, so the user will join that room.
            socket.emit("join_room", chatRoom);
        }
    };
    joinRoom();

    // whenever there's a change in the socket
    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log(data);
            // add the new message that have been sent to receive_message.
            setChatList((list) => [...list, data]);
        });
    }, [socket]);

  return (
    <ChatContext.Provider value={{ message, setMessage, chatList, setChatList, chatAvatar }}>
        <Box sx={{
                px: 2,
                py: 1,
                height: '100vh',
                display: 'flex',
                flexDirection: 'column-reverse'
            }}
        >
            <Box sx={{ width: '100%', my: 1 }}>
                <ChatArea socket={ socket } username={ chatUsername } roomId={ chatRoom } />
            </Box>
            <Box sx={{
                width: '100%',
                height: '100vh',
                my: 1,
                display: 'flex',
                overflow: 'hidden',
                overflowY: 'scroll',
                flexDirection: 'column'
            }}>
                {
                    chatList.map( ( chatItem, index ) => {
                        if(chatUsername !== chatItem.sender) return <ChatReceiver avatar={chatItem.avatar} username={chatItem.sender} message={chatItem.message} time={chatItem.time} />
                        return <ChatSender avatar={chatItem.avatar} username={chatItem.sender} message={chatItem.message} time={chatItem.time} />
                    })
                }
                <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ width: '100%', my: 1 }}>
                <ChatGroupAvatar />
                <Divider />
            </Box>
        </Box>
    </ChatContext.Provider>
  );
};

export default ChatRoom;
