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
import { useLocation, useNavigate } from 'react-router-dom'; 
import {useEffect} from 'react'
import { AppContext } from '../App';
import { useContext } from 'react';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';
import { useState } from 'react';
import ForgotPwd from '../components/ForgotPwd';
import { IconButton } from '@mui/material';
// import Link from '@mui/material/Link';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbar, setSnackbar] = useState(false);
  const [register, setRegister] = useState(false); //replace true if register is auto display
  const [data, setData] = useState('');
  const [token, setToken] = useState('');
  const { isTokenExist, setIsTokenExist } = useContext(AppContext);
  const [showForgotPwd, setShowForgotPwd] = useState(false)
  

  const navigate = useNavigate();  
  const location = useLocation();

  const roomUID = location.state?.roomUID;
  const roomLoc = location.state?.roomLoc;



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = register
        ? 'http://localhost:8000/api/v1/user/register'
        : 'http://localhost:8000/api/v1/user/login';// this is auto dispay because register is false by default

      const requestData = register
        ? { email, username, password }
        : { username, password };

      const response = await axios.post(url, requestData);
      if (response.status === 200 || response.status === 201) {
        setData(response.data);

        // setToken(`aniflix_${response.data.token}`);
        setToken(response.data.token);

        setSuccessMessage(response.data.message);
        setSnackbar(true);
        setIsTokenExist(true);

        // localStorage.setItem('aniflixT', `aniflix_${response.data.token}`);
        localStorage.setItem('aniflix_token', response.data.token);

        // localStorage.setItem('username', response.data.username);
        localStorage.setItem('aniflix_username', response.data.username);

        const fromRoom = localStorage.getItem('fromRoom');
        const fromUserPage = localStorage.getItem('fromUserPage');
        console.log(fromRoom)

        if(fromRoom === 'true'){
          setTimeout(() => {  
            localStorage.removeItem('fromRoom');
            navigate('/room', { state: { roomUID: roomUID }});
  
          }, 3000);
        } else if(fromUserPage === 'true')  {
          localStorage.removeItem('fromUserPage');
          navigate("/user-profile")
        }


      }
    } catch (error) {
      if (error.response && (error.response.status === 404 || error.response.status === 400)) {
        const errorMessage = error.response.data.error; // Get the error message from the response
        setErrorMessage(errorMessage);
        setSnackbar(true);

      }
    }
  };

 
  const handleRegister = () => {
    setRegister(!register);
  }


  const handleSnackbar = () => {
    setSnackbar(false);
  };
  const handleChangePwd = () => {
    if (showForgotPwd) setShowForgotPwd(false)
    else setShowForgotPwd(true)
  }

  // useEffect(() => {
   
  //   console.log(fromRoom);
  // }, [ fromRoom])


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
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {!showForgotPwd ?
            (
              <>
                <Typography component="h1" variant="h5">
                  {register ? "Register" : "Login"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: register ? 1 : 3 }}  >
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    autoFocus
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {register && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      autoFocus
                      onChange={(e) => setEmail(e.target.value)}
                    />)}
                  <TextField
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
                  />
                  {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {register ? "Register" : "Login"}
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                    <Grid item>
                      <Button variant="text" onClick={handleRegister}>
                        {register ? "Already have an account?" : "Don't have an account? Register now!"}
                      </Button>
                    </Grid>

                  </Grid>
                </Box>
              </>
            ) : (<ForgotPwd />)}
          <Grid item>
            {!showForgotPwd ?
              (
                <Button variant="text" onClick={handleChangePwd} >
                  {!register && "Forgot Password?"}
                </Button>
              ) : (
              <IconButton onClick={handleChangePwd}>
                <KeyboardReturnIcon />
              </IconButton>

            )}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default LoginPage