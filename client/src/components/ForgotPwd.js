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
import { Card } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function ForgotPwd() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbar, setSnackbar] = useState(false);

  const handleSnackbar = () => {
    setSnackbar(false);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await axios.put('http://localhost:8000/api/v1/user/update', {
    //     email: email,
    //     updateUser: {
    //       password: password,
    //     }
    //   });

    //   if (response.status === 200) {
    //     setSuccessMessage(response.data.message);
    //     setSnackbar(true);

    //   } else if (response.status === 404) {
    //     setErrorMessage(response.data.error);
    //     setSnackbar(true);

    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="xs">
        <Snackbar
          open={snackbar}
          autoHideDuration={2000}
          onClose={handleSnackbar}>
          <SnackbarContent sx={{ backgroundColor: successMessage ? 'green' : 'pink', }}
            message={successMessage || errorMessage} />
        </Snackbar>
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" margin={5}>
            Find your Email
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate >

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              value={email}
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              submit
            </Button>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default ForgotPwd