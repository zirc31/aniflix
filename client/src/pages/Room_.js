import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { Alert } from '@mui/material';
import ReactPlayer from 'react-player';
import ChatRoom from './ChatRoom'
import { AppContext } from '../App';
import { useContext } from 'react';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Room() {
  const [roomData, setRoomData] = useState(null);
  const [snackbar, setSnackbar] = useState(false);
  const [episodeId, setEpisodeId] = useState('');
  const [url, setUrl] = useState('');
  const { isTokenExist, setIsTokenExist } = useContext(AppContext);
  const [username, setUsername] = useState('');



  // const location = useLocation();
  // const roomUID = location.state?.roomUID;

  const navigate = useNavigate();
  // const roomLoc = location.state?.roomLoc;
  // const selectedAnime = location.state?.selectedAnime;
  // const animeId = location.state?.animeId;
  const roomId = localStorage.getItem('aniflix_roomId');
  const animeId = localStorage.getItem('aniflix_animeId');
  const selectedAnime= localStorage.getItem('aniflix_episodeId');


  useEffect(() => {
    const watchAnime = async () => {
      try {
        const apiUrl = `http://localhost:8000/api/v1/fetch/watch/riimuru/${animeId}/${selectedAnime}`
        const response = await axios.get(apiUrl);
        const { message, data } = response.data;
        setEpisodeId(data.sources[0].file)
    
      }
      catch (error) {
        console.error(error);

      }
    }
    watchAnime();
  })


  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/room/${roomId}`);
        setRoomData(response.data.room);

      }
      catch (error) {
        console.error(error);
      }
    }

    if (localStorage.getItem("aniflix_token") === null) {
      setSnackbar(true);
      setIsTokenExist(false)
      localStorage.setItem('fromRoom', 'true');
      setTimeout(() => {
        navigate('/login-page');

      }, 3000);
    } else {
      setIsTokenExist(true);
      const username = localStorage.getItem('username');
      setUsername(username);
    }
    console.log(username)
    // if (roomUID && !roomLoc){
    //     fetchRoomData();
    //     window.history.replaceState(null, null, `${window.location.pathname}/${roomUID}`); // replaces url in the browser wil lahve to review later

    // } else if(roomUID && roomLoc === undefined) {
    //     // navigate('/login-page', { state: { roomUID: roomUID, roomLoc: false }})
    //     setTimeout(() =>{
    //         setSnackbar(true);

    //         navigate('/login-page', { state: { roomUID: roomUID, roomLoc: false }})
    //     }, 3000)
    // }
  }, [navigate, setIsTokenExist, setUsername])

  const handleSnackbar = () => {
    setSnackbar(false);
  };



  return (
    < >

      <CssBaseline />
      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        onClose={handleSnackbar}>
        <Alert severity="error" onClose={handleSnackbar}>
          You must be logged in to enter or create a room.
        </Alert>
      </Snackbar>
      <main>

        {/* Hero unit */}
        <Container lg={{ py: 1 }} maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          {/* End hero unit */}
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card sx={{ height: '100%', display: 'flex' }}>
                <CardMedia component="div" sc={{ margin: 2 }} />
                <CardActions sx={{ display: 'flex', flexDirection: 'column', marginTop: 6 }} >
                  <Typography>{selectedAnime}</Typography>
                  <ReactPlayer url={episodeId} controls width="100%" height="450px" />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={4} >
              <ChatRoom/>
              <Card
                sx={{ display: 'flex' }}>
                <CardMedia
                  component="div"
                  sx={{}} />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>

    </>
  )
}

export default Room

