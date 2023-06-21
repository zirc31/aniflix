import * as React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { ChatContext } from '../pages/ChatRoom';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import '@fontsource/public-sans';

const BaseURLofBE = process.env.REACT_APP_BE_BASEURL;
// ${BaseURLofBE}

const ChatArea = ( { socket, username, roomId } ) => {
    const [italic, setItalic] = React.useState(false);
    const [fontWeight, setFontWeight] = React.useState('normal');
    const [anchorEl, setAnchorEl] = React.useState(null);

    const chatContext = useContext( ChatContext );
    // ChatContext
    // message, setMessage, chatList, setChatList, chatAvatar, chatListCounter, setChatListCounter
    // const { isTokenExist, setIsTokenExist } = useContext(ChatContext);
    // const [ message, setMessage ] = useContext(ChatContext);
    // const [ chatList, setChatList ] = useContext(ChatContext);
    // const [ chatAvatar, setChatAvatar ] = useContext(ChatContext);
    // const [ chatListCounter, setChatListCounter ] = useContext(ChatContext);


    const sendMessage = async () => {
        if ( chatContext.message !== '' ) {
            const chatData = {
                roomId: roomId,
                sender: username,
                avatar: chatContext.chatAvatar,
                message: chatContext.message,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", chatData);
            chatContext.setChatList((list) => [...list, chatData]);
            // setChatList((list) => [...list, chatData]);

            console.log(chatContext.chatListCounter);

            const url = `${BaseURLofBE}/api/v1/chat/add/message`;
            // http://localhost:8000/api/v1/chat/delete/message
            const requestData = {
                roomId: roomId,
                chatData: chatData
            };
            console.log(requestData);
            const updateChatDb = async (event) => {
                try {
                    const response = await axios.post(url, requestData);
                    if (response.status === 200 || response.status === 201) {
                        console.log(`Successfully updated the chat.`);
                    }
                } catch (error) {
                    if (error.response && (error.response.status === 404 || error.response.status === 400)) {
                        const errorMessage = error.response.data.error; // Get the error message from the response
                    }
                }
            }
            updateChatDb();

            chatContext.setMessage('');
            // setMessage('');
        }
    };

  return (
    <>
        <FormControl>
            <Textarea
                onChange={(event) => {
                    chatContext.setMessage(event.target.value);
                    // setMessage(event.target.value);
                }}
                onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                }}
                placeholder="Type something here…"
                minRows={3}
                value={chatContext.message}
                endDecorator={
                    <Box
                        sx={{
                        display: 'flex',
                        gap: 'var(--Textarea-paddingBlock)',
                        pt: 'var(--Textarea-paddingBlock)',
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        flex: 'auto'
                        }}
                    >
                        <IconButton
                            variant="plain"
                            color="neutral"
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <FormatBold />
                            <KeyboardArrowDown fontSize="md" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            size="sm"
                            placement="bottom-start"
                            sx={{ '--ListItemDecorator-size': '24px' }}
                        >
                            {['200', 'normal', 'bold'].map((weight) => (
                                <MenuItem
                                    key={weight}
                                    selected={fontWeight === weight}
                                    onClick={() => {
                                    setFontWeight(weight);
                                    setAnchorEl(null);
                                    }}
                                    sx={{ fontWeight: weight }}
                                >
                                    <ListItemDecorator>
                                        {fontWeight === weight && <Check fontSize="sm" />}
                                    </ListItemDecorator>
                                    {weight === '200' ? 'lighter' : weight}
                                </MenuItem>
                            ))}
                        </Menu>
                        <IconButton
                            variant={italic ? 'soft' : 'plain'}
                            color={italic ? 'primary' : 'neutral'}
                            aria-pressed={italic}
                            onClick={() => setItalic((bool) => !bool)}
                        >
                            <FormatItalic />
                        </IconButton>
                        <Button
                            sx={{ ml: 'auto' }}
                            onClick={ () => { sendMessage() } }
                        >
                            Send Message
                        </Button>
                    </Box>
                }
                sx={{
                    minWidth: 300,
                    fontWeight,
                    fontStyle: italic ? 'italic' : 'initial'
                }}
            />
        </FormControl>
    </>
  )
}

export default ChatArea;
