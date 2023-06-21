import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card } from '@mui/material';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import UserPage from './UserPage';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Popover from '@mui/material/Popover';
import Autocomplete from '@mui/material/Autocomplete';
import ImageList from '@mui/material/ImageList';
import axios from 'axios';
import { useEffect } from 'react';
import { AppContext } from '../App';
import { useContext } from 'react';

; const darkTheme = createTheme({
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
    }
];



function UserProfile() {
    const [showIcon, setShowIcon] = useState(false);
    const [showUserPage, setShowUserPage] = useState(false);
    const [bgImageUrl, setBgImageUrl] = useState(''); // this is where image url being stored
    const [popover, setPopover] = useState(false); // 
    const [imageUrl, setImageUrl] = useState('');
    const [changeChoice, setChangeChoice] = useState(false); //
    const [avatarImageUrl, setAvatarImageUrl] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const [role, setRole] = useState('');
    const { isTokenExist, setIsTokenExist } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [data, setData] = useState('');




    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('aniflix_token');
                // const token = tokenPrefix.replace('aniflix_', '');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                const response = await axios.get('http://localhost:8000/api/v1/user/data', config);

                const { data } = response.data;
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setUsername(data.username);
                setRole(data.role);
                setAvatarImageUrl(data.avatarImageUrl)
                setBgImageUrl(data.bgImageUrl)

                console.log(data);
            } catch (error) {

                console.error(error);
            }
        };
        fetchData();
    }, []);

    const user = {
        username: username,
        name: firstName,
        lastname: lastName,
        role: role,

    };

    const handleShowUserPage = () => {
        if (!showUserPage) setShowUserPage(true);
        else setShowUserPage(false)

    }
    const handlePopoverOpen = (event) => {
        setPopover(true);
    };

    const handlePopoverClose = () => {
        setPopover(false);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleImageUrlSubmit = () => {
        if (!changeChoice) {

            setBgImageUrl(imageUrl);
            setPopover(false);
            setImageUrl('');
        }
        else {
            setAvatarImageUrl({ imageUrl });
            setPopover(false);
            setImageUrl('');
        }
    };

    const handleChoiceImage = () => {
        if (!changeChoice) setChangeChoice(true);
        else setChangeChoice(false)
    };

    useEffect(() => {
        
        console.log(firstName);
        console.log(token);
        console.log(data)
    }, [data, firstName]);


    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="md">
                <CssBaseline />
                {!showUserPage ? (
                    <Paper
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: 2
                        }}
                    >

                        <Box sx={{
                            backgroundImage: `url(${bgImageUrl})`,
                            backgroundRepeat: "no-repeat",
                            backgroundColor: "black",
                            backgroundAttachment: "fixed",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            height: 200,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: 5,
                            borderRadius: 1,
                            position: "relative"
                        }}
                            onMouseOver={() => setShowIcon(true)}
                            onMouseOut={() => setShowIcon(false)}>

                            <Avatar src={avatarImageUrl} sx={{ m: 8, bgcolor: 'primary.main', width: 120, height: 120, justifySelf: "center" }}
                            >
                                {/* Replace with user avatar */}
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            <Grid sx={{ position: "absolute", right: 0, backgroundImage: `url(${bgImageUrl})`, }}>
                                <Card>

                                    {showIcon &&
                                        <IconButton aria-label="edit" size="small" onClick={handlePopoverOpen}
                                        >
                                            <EditIcon fontSize="inherit" />

                                        </IconButton>
                                    }
                                </Card>

                            </Grid>
                        </Box>
                        <Box sx={{ mt: 4, mb: 8 }}>
                            <Typography variant="body1">
                                <strong>Username:</strong> {user.username}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Name:</strong> {user.name}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Last Name:</strong> {user.lastname}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Role:</strong> {user.role}
                            </Typography>
                        </Box>

                    </Paper>) : (<UserPage />)}
                <IconButton>
                    {!showUserPage ? (
                        <SettingsIcon onClick={handleShowUserPage}></SettingsIcon>
                    ) : (
                        <KeyboardReturnIcon onClick={handleShowUserPage}></KeyboardReturnIcon>

                    )}

                </IconButton>
                <Popover
                    open={Boolean(popover)}
                    anchorEl={popover}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                        vertical: 'left',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <Box p={2} height={changeChoice ? 400 : 200}>
                        <Button onClick={handleChoiceImage}>  {changeChoice ? "Cover" : "Avatar"}</Button>


                        {changeChoice ? (
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={images}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Choose an Avatar" size="small" />}
                                renderOption={(props, option) => (
                                    <Grid {...props}>
                                        <img src={option.imageUrl} alt='avatar' style={{ width: 50, height: 50 }} />

                                    </Grid>
                                )}
                                onChange={(event, value) => {
                                    setAvatarImageUrl(value.imageUrl);
                                }}
                                ListboxComponent={(props) => ( // this is use to render drowdown items/images
                                    <Grid {...props} component={ImageList} cols={3} gap={8} />
                                )}
                            />


                        ) : (
                            <>
                                <TextField fullWidth label="Image URL" value={imageUrl} onChange={handleImageUrlChange} />
                                <Button sx={{ mt: 2 }} variant="contained" onClick={handleImageUrlSubmit}>
                                    Submit
                                </Button>
                            </>
                        )}
                    </Box>
                </Popover>
            </Container>
        </ThemeProvider>
    );
}

export default UserProfile;
