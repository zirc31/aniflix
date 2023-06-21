import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import ImageList from '@mui/material/ImageList';



const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const images = [
    {
        label: "Image 1",
        imageUrl: "https://sportshub.cbsistatic.com/i/2021/08/09/bc1a467e-8fc2-4ccd-b97c-72da7af980df/my-hero-academia-all-might-cosplay-1275931.jpg"
    },
    {
        label: "Image 2",
        imageUrl: "https://miro.medium.com/v2/resize:fit:1400/1*2bjwCLaA8TfH40OXcyLNvA.png"
    },
    {
        label: "Image 3",
        imageUrl: "https://44.media.tumblr.com/dfafb137764bb386e419fd6dcfd81860/c7be82a97a24e1b9-f2/s400x600_f1/792979e242ce67f9b359ba50f668cf7ce6d9f0eb.gif"
    },
    {
        label: "Image 4",
        imageUrl: "https://cdn1.forevergeek.com/uploads/33/2022/12/Opera-Snapshot_2022-12-21_140051_www.youtube.com_.jpg"
    },
    {
        label: "Image 5",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtj5A8aU7TF-jT2RhynRLHz2cw6vfGqJiFToFKSCbfJOXtTssB56PynFcuMJQnkbBfyzI&usqp=CAU"
    },
    {
        label: "Image 6",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQezS2aD8nRK3quyWup6bH9P6-hN8uyGrPpKJl2LVtvQ-p-eWCMptvmoNc1oPi834Ez7Q&usqp=CAU"
    }
];

function UserPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbar, setSnackbar] = useState(false);
    const [avatarImageUrl, setAvatarImageUrl] = useState('');
    const [bgImageUrl, setBgImageUrl] = useState(''); // this is where image url being stored

    const navigate = useNavigate();


    const handleSnackbar = () => {
        setSnackbar(false);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('aniflix_username');

        try {
            const response = await axios.put('http://localhost:8000/api/v1/user/update', {
                // userId:userId,
                username: username, //must use existing username
                updateUser: {

                    firstName: firstName,
                    lastName: lastName,
                    // password: password,
                    avatarImageUrl: avatarImageUrl,
                    bgImageUrl: bgImageUrl
                }
            });

            if (response.status === 200) {
                setSuccessMessage(response.data.message);
                setSnackbar(true);
                localStorage.setItem('fromUserPage', 'true');
                setTimeout(() => {
                    navigate('/login-page');

                }, 3000);


            } else if (response.status === 404) {
                setErrorMessage(response.data.error);
                setSnackbar(true);

            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <Snackbar open={snackbar} autoHideDuration={2000} onClose={handleSnackbar}>
                    <SnackbarContent
                        sx={{ backgroundColor: successMessage ? 'green' : 'pink' }}
                        message={successMessage || errorMessage}
                    />
                </Snackbar>
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column' }}>
                    <Typography component="h1" variant="h5">
                        Edit Profile
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        {/* <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Enter you existing Username"
                            name="username"
                            autoComplete="username"
                            value={username}
                            size="small"
                            onChange={(e) => setUsername(e.target.value)}
                        /> */}
                        {/* <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="avatarImageUrl"
                            label="Avatar Image URL"
                            id="avatarImageUrl"
                            value={avatarImageUrl}
                            onChange={(e) => setAvatarImageUrl(e.target.value)}
                        /> */}
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={images}
                            sx={{ maxWidth: 400 }}
                            renderInput={(params) => <TextField {...params} label="Choose an Avatar" size="small" />}
                            renderOption={(props, option) => (
                                <Grid {...props}>
                                    <img src={option.imageUrl} alt="avatar" style={{ width: 50, height: 50 }} />
                                </Grid>
                            )}
                            onChange={(event, value) => {
                                setAvatarImageUrl(value.imageUrl);
                            }}
                            ListboxComponent={(props) => <Grid {...props} component={ImageList} cols={3} gap={8} />}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="bgImageUrl"
                            label="Background Image URL"
                            id="bgImageUrl"
                            value={bgImageUrl}
                            onChange={(e) => setBgImageUrl(e.target.value)}
                        />
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>

                        {/* <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        /> */}

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Submit
                        </Button>
                        <Grid container>
                            <Grid item></Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default UserPage;