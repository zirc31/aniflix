import React, { useState } from 'react';
import { Button, TextField, Grid } from '@mui/material';
import logo from '../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={8}>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" onClick={handleSearch} fullWidth>
              SEARCH
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className="buttons-container">
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button variant="contained">GET STARTED</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;