import React from 'react';
import { useState, useEffect, useRef, createContext } from 'react';
import axios from 'axios';
import { Box, Divider } from '@mui/material';
import ChatArea from '../components/ChatArea';
import ChatGroupAvatar from '../components/ChatGroupAvatar';
import ChatReceiver, { ChatSender } from '../components/ChatMessage';

import io from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_SOCKET_IO_SERVER_HTTP);

export const ChatContext = createContext();

const BaseURLofBE = process.env.REACT_APP_BE_BASEURL;
// ${BaseURLofBE}

const ChatRoom = ( props ) => {

    // enable for testing via params.
    // const queryParams = new URLSearchParams(window.location.search);
    // const queryRoomId = queryParams.get("roomId");
    // const queryUsername = queryParams.get("username");

    const [ message, setMessage ] = useState('');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior:"smooth"});
    };

    // check localStorage
    const localToken = localStorage.getItem("aniflix_token");
    const localRoomId = localStorage.getItem("aniflix_roomId");

    // Chat
    const [ chatAvatar, setChatAvatar ] = useState('');
    const [ chatUsername, setChatUsername ] = useState('');
    const [ chatRoom, setChatRoom ] = useState( localRoomId );
    const [ chatList, setChatList ] = useState([]);
    const [ chatListCounter, setChatListCounter ] = useState(0);

    const getUserData = async () => {
        try {
            const endpointUrl = `${BaseURLofBE}/api/v1/user/data`;
            const response = await axios.get( endpointUrl, {
                headers: {
                'Authorization': `Bearer ${localToken}`
                }
            });
            const userdata = response.data.data;
            setChatAvatar(userdata.avatarImageUrl);
            setChatUsername(userdata.username);
        } catch (error) {
            console.error(error);
        };
    };
    getUserData();

    // // check for chat history in db
    // const getChatHistory = async () => {
    //     const url = 'http://localhost:8000/api/v1/chat/history';
    //     const requestData = { "roomId": chatRoom };
    //     console.log(requestData);
    //     try {
    //             const response = await axios.get(url, requestData);
    //             if (response.status === 200 || response.status === 201) {
    //                 console.log(response.data);
    //             }
    //     } catch (error) {
    //         if (error.response && (error.response.status === 404 || error.response.status === 400)) {
    //             const errorMessage = error.response.data.error;
    //             console.error(errorMessage);
    //         }
    //     };
    // };
    // if( chatRoom ) {
    //     getChatHistory();
    // }


    // whenever chatList has been updated, chat window will auto scroll down.
    const messagesEndRef = useRef(null);
    useEffect(() => {
        scrollToBottom();
        setChatListCounter(chatList.length);
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
    <ChatContext.Provider value={{ message, setMessage, chatList, setChatList, chatAvatar, setChatAvatar, chatListCounter, setChatListCounter }}>
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
                        if(chatUsername !== chatItem.sender) return <ChatReceiver index={index} avatar={chatItem.avatar} username={chatItem.sender} message={chatItem.message} time={chatItem.time} />
                        return <ChatSender index={index} avatar={chatItem.avatar} username={chatItem.sender} message={chatItem.message} time={chatItem.time} />
                    })
                }
                <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ width: '100%', my: 1 }}>
                {/* <ChatGroupAvatar /> */}
                <Divider />
            </Box>
        </Box>
    </ChatContext.Provider>
  );
};

export default ChatRoom;
