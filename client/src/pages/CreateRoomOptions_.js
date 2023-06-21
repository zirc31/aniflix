import React from 'react'
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendLink from '../modals/SendLink';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { AppContext } from '../App';
import { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const steps = ['Choose an Anime'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return;
    case 1:
      return //<SendLink />;
    case 2:
      return;
    default:
      throw new Error('Unknown step');
  }
}

function CreateRoomOptions() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [queryKeyword, setQueryKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectAnime, setSelectAnime] = useState(true);
  const [watchAnime, setAnimeWatch] = useState('');
  const [episodeAnime, setEpisodeAnime] = useState([]);
  const [animeSelect, setAnimeSelect] = useState('');
  const [animeID, setAnimeId] = useState('');
  const { isTokenExist, setIsTokenExist } = useContext(AppContext);
  const [snackbar, setSnackbar] = useState(false);
  const [existAnimeId, setExistAnimeId] = useState(false);
  const [existEpisodeId, setExistEpisdeId] = useState(false);


  const navigate = useNavigate();
  // const location = useLocation();
  // const roomUID = location.state?.roomUID;




  const handleSearch = async (event) => {
    try {
      event.preventDefault();
      const apiUrl = `http://localhost:8000/api/v1/fetch/search/riimuru/title?keyword=${queryKeyword}`;
      const response = await axios.get(apiUrl);
      const { message, data } = response.data;


      setSearchResults(data);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error occurred while searching. Please try again.');
    }
  };

  const handleImage = async (event, result) => {
    event.preventDefault();
    try {
      const apiUrl = `http://localhost:8000/api/v1/fetch/info/riimuru/${result.animeId}`;
      const response = await axios.get(apiUrl);
      const { message, data } = response.data;
      setAnimeId(result.animeId)
      const animeId = localStorage.setItem("aniflix_animeId", result.animeId);

      setSelectAnime(false)
      setAnimeWatch(result);
      setEpisodeAnime(data.episodesList.map((episode) => episode.episodeId));


    }
    catch (error) {
      console.error(error);
      setErrorMessage('Error occurred while searching. Please try again.');
    }

  }

  const handleNext = (event) => {
    event.preventDefault();
    if (steps.length >= 2) { // if the is a second page
      setActiveStep(activeStep + 1);
    }
    else {
      try {

        navigate('/create-room');
        // { state: { roomUID: roomUID, roomLoc: false, selectedAnime: animeSelect, animeId: animeID } }

      }
      catch (error) {

      }

    }
  };

  const handleSelectAgain = (event) => {
    event.preventDefault();
    setSelectAnime(true)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleSnackbar = () => {
    setSnackbar(false);
  };

  useEffect(() => {
    // if (localStorage.getItem("aniflixT") === null) {
    //   setErrorMessage('User must be logged in to create  a room');
    //   setSnackbar(true);
    //   setIsTokenExist(false)
    //   setTimeout(() => {
    //     navigate('/login-page');

    //   }, 3000);
    // } else {
    //   setIsTokenExist(true);
    // }

    if (localStorage.getItem("aniflix_animeId")) {
      const animeIden = localStorage.getItem("aniflix_animeId");
      setExistAnimeId(true);
      setSelectAnime(false)


      const fetchEp = async (result) => {

        try {
          const apiUrl = `http://localhost:8000/api/v1/fetch/info/riimuru/${animeIden}`;
          const response = await axios.get(apiUrl);
          const { message, data } = response.data;
          setAnimeId(result.animeId)
          setEpisodeAnime(data.episodesList.map((episode) => episode.episodeId));


        }
        catch (error) {
          console.error(error);
          setErrorMessage('Error occurred while searching. Please try again.');
        }

      }
      fetchEp(watchAnime);
    } else if (localStorage.getItem("aniflix_episodeId")) {
      setEpisodeAnime(true);
    }


  }, [watchAnime]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Snackbar
        open={snackbar}
        autoHideDuration={2000}
        onClose={handleSnackbar}>
        <Alert severity="error" onClose={handleSnackbar}>
          You must be logged in or have an account to enter a room.
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Card sx={{ margin: 2, justifyContent: 'center', alignItems: 'center' }} >
            {selectAnime ? (
              <>
                <CardContent>
                  <TextField id="outlined-basic" label="Search" variant="outlined" value={queryKeyword} onChange={(e) =>
                    setQueryKeyword(e.target.value)} size="small" />
                  <Button onClick={handleSearch} size="small">Search</Button>
                </CardContent>
                <Card sx={{ maxHeight: 250, overflowX: 'auto' }}>
                  <ImageList sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1, padding: 2 }} cols={3}>
                    {errorMessage && <p>{errorMessage}</p>}
                    {searchResults.length > 0 ? (
                      searchResults.map((result, index) => (
                        <ImageListItem key={index} sx={{ minWidth: 150, position: 'relative', cursor: 'pointer' }}>
                          <img
                            src={result.animeImg}
                            alt={result.animeTitle}
                            sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                            onClick={(event) => handleImage(event, result)}
                          />
                          <ImageListItemBar title={result.animeTitle} position="bottom" />
                        </ImageListItem>
                      ))
                    ) : (
                      <p>No results found.</p>
                    )}
                  </ImageList>
                </Card>
              </>
            ) : (
              <Card>
                <ImageList sx={{ display: 'flex', padding: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <ImageListItem sx={{ maxWidth: 150, position: 'relative', cursor: 'pointer' }}>
                    <img
                      src={watchAnime.animeImg}
                      alt={watchAnime.animeTitle}
                      sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                    />
                    <ImageListItemBar title={watchAnime.animeTitle} position="bottom" />
                  </ImageListItem>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={episodeAnime}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Episodes" size="small" />}
                    onChange={(event, selectedEpisode) => { setAnimeSelect(selectedEpisode); const episodeId = localStorage.setItem("aniflix_episodeId", selectedEpisode); setExistEpisdeId(true) }}
                  />
                </ImageList>
                <Button onClick={handleSelectAgain} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              </Card>
            )}
          </Card>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                {/* insert text here. */}
              </Typography>
              <Typography variant="subtitle1">
                {/* insert some text here*/}
              </Typography>
            </React.Fragment>
          ) : (
            existEpisodeId ? (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Create room' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            ) : null
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  )
}

export default CreateRoomOptions
