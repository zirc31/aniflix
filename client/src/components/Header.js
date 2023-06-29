import React, { useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { isTokenExist, setIsTokenExist } = useContext(AppContext);

  const handleSearch = () => {
    // Navigate to the search page with the search keyword
    navigate(`/search?keyword=${encodeURIComponent(searchTerm)}`);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="top-line">
      <div className="logo-container">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="search-bar-container">
        {/* <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleInputChange}
              fullWidth
              inputProps={{
                style: { color: 'white' },
              }}
              InputLabelProps={{
                style: { color: 'white' },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleSearch} fullWidth>
              SEARCH
            </Button>
          </Grid>
        </Grid> */}
        {/* <Link to="/create-room-options" style={{ textDecoration: 'none' }}>
          <Button variant="contained">SEARCH ANIME</Button>
        </Link> */}
      </div>
      <div className="buttons-container">
        <Box sx={{ display: 'flex' }} >
          <Box mr={1} >
            <Link to="/create-room-options" style={{ textDecoration: 'none' }}>
            <Button variant="contained">SEARCH ANIME</Button>
            </Link>
          </Box>
          <Box mr={1} >
            <Link to="/create-room" style={{ textDecoration: 'none' }}>
              <Button variant="contained">JOIN ROOM</Button>
            </Link>
          </Box>
          {
            isTokenExist ?
            <Box >
              <Link to="/logout" style={{ textDecoration: 'none' }}>
                <Button variant="contained">LOGOUT</Button>
              </Link>
            </Box>
            :
            <Box >
              <Link to="/login-page" style={{ textDecoration: 'none' }}>
                <Button variant="contained">GET STARTED</Button>
              </Link>
            </Box>
          }
        </Box>
      </div>
    </div>
  );
};

export default Header;