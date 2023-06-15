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

function SearchPage() {
    const [queryKeyword, setQueryKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectAnime, setSelectAnime] = useState(true);
    const [snackbar, setSnackbar] = useState(false);


    const location = useLocation();
    const keyword = location.state?.keyword;

    const handleSearch = async (event) => {
        setQueryKeyword(keyword)

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
    const handleSnackbar = () => {
        setSnackbar(false);
    };
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const apiUrl = `http://localhost:8000/api/v1/fetch/search/riimuru/title?keyword=${keyword}`;
                const response = await axios.get(apiUrl);
                const { message, data } = response.data;

                setSearchResults(data);
            } catch (error) {
                console.error(error);
                setErrorMessage('Error occurred while searching. Please try again.');
            }
        };

        if (keyword) {
            fetchSearchResults();
        }
    }, [keyword]);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Card sx={{ margin: 2, justifyContent: 'center', alignItems: 'center' }} >
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
                                            />
                                            <ImageListItemBar title={result.animeTitle} position="bottom" />
                                        </ImageListItem>
                                    ))
                                ) : (
                                    <p>No results found.</p>
                                )}
                            </ImageList>
                        </Card>

                    </Card>
                </Paper>
            </Container>
        </ThemeProvider>
    )
}

export default SearchPage