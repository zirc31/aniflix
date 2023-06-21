import * as React from 'react';
import { useState } from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DoorSlidingTwoTone from '@mui/icons-material/DoorSlidingTwoTone';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../App';
import { useContext } from 'react';
import {useEffect} from 'react'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


function CreateRoom() {
  const [roomid, setRoomid] = useState('');
  const [password,setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbar, setSnackbar] = useState(false);
  const [createRoom, setCreateRoom] = useState(false);
  const { isTokenExist, setIsTokenExist } = useContext(AppContext);


  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const url = createRoom
        ? 'http://localhost:8000/api/v1/room/create'
        : 'http://localhost:8000/api/v1/room/join';
        const response = await axios.post(url, { roomid, password });
        const roomUID = response.data.roomUID; // Access the roomUID from the response

        localStorage.setItem('aniflix_roomId', response.data.roomUID);

      
      if (response.status === 200 || response.status === 201 ){
          setSuccessMessage(response.data.message);
          setSnackbar(true);

          if(!createRoom)
          {
            setTimeout(() => {  
            navigate('/room'); 
  
          }, 2000)

          }

      };
    }
    catch(error){
      if (error.response && (error.response.status === 404 || error.response.status === 400)){
        const errorMessage = error.response.data.error;
        setErrorMessage(errorMessage);
        setSnackbar(true);

      }
    }

  };
  const handleSnackbar = () => {
    setSnackbar(false);
  };

  const handleCreateRoom = () => {
    setCreateRoom(!createRoom);
  };

  useEffect(() => {
    if( localStorage.getItem("aniflix_token") === null ) {
        setErrorMessage('User must be logged in to create  a room');
        setSnackbar(true);
        setIsTokenExist(false)
        setTimeout(() => {  
          navigate('/login-page');

        }, 3000);
    } else {
        setIsTokenExist(true);
    }
  },[]);
    return (
        <ThemeProvider theme={darkTheme}>
          <Container component="main" maxWidth="xs">
            <Snackbar
            open={snackbar}
            autoHideDuration={2500}
            onClose={handleSnackbar}>
            <SnackbarContent sx={{ backgroundColor: successMessage ? 'green' : 'pink', }}
            message={successMessage || errorMessage} />
            </Snackbar>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <DoorSlidingTwoTone />
              </Avatar>
              <Typography component="h1" variant="h5">
              {createRoom ? 'Create Room' : 'Join Room'}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="roomid"
                      label="Room id"
                      name="roomname"
                      value={roomid}
                      onChange={(e) => setRoomid(e.target.value)} 
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}/>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}>
                  {createRoom ? 'Create' : 'Join'}
                </Button>
              </Box>
              <Grid container>
                <Grid item>
                <Button variant="text" onClick={handleCreateRoom}>
                {createRoom ? 'Already have a room?' : "Don't have a room yet?"}
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </ThemeProvider>
      );
    }
export default CreateRoom