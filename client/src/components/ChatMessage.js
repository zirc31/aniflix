import React from 'react'
import { Box, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar';

const ChatReceiver = ( { avatar, username, message, time } ) => {
  return (
    <>
        <Box sx={{ m: 2 }}>
            <Box sx={{ display: 'flex', maxWidth: '85%' }}>
                <Avatar sx={{ mr: 1 }} alt={ username } src={ avatar } />
                <Box sx={{ p: 2, mt: 1, borderRadius: 4, bgcolor: '#e0ffff' }}>
                    <Typography variant='subtitle2'>
                        { username } <small>[ { time } ]</small>
                    </Typography>
                    <Typography variant='body2'>
                        { message }
                    </Typography>
                </Box>
            </Box>
        </Box>
    </>
  )
}

const ChatSender = ( { avatar, username, message, time } ) => {
    return (
        <>
            <Box sx={{ m: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', maxWidth: '85%' }}>
                    <Avatar sx={{ mr: 1 }} alt={ username } src={ avatar } />
                    <Box sx={{ p: 2, mt: 1, borderRadius: 4, bgcolor: '#f0fff0' }}>
                        <Typography variant='subtitle2'>
                            { username } <small>[ { time } ]</small>
                        </Typography>
                        <Typography variant='body2'>
                            { message }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ChatReceiver;
export { ChatSender }