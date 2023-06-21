import React from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from '../images/logo.png'
import { CardContent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { set } from 'mongoose';
import useMediaQuery from "@mui/material/useMediaQuery";



const pages = ["Profile", "Room"];
const logoutSettings = ["Logout"];
const loginSettings = ["Login"];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { isTokenExist, setIsTokenExist } = useContext(AppContext);
    const [searchResults, setSearchResults] = useState([]);
    const [queryKeyword, setQueryKeyword] = useState('');
    const [inSearchPage, setInSearchPage] = useState(false);



    const navigate = useNavigate();
    const handleSearch = (keyword) => {
        

        navigate("create-room-options",{state:{keyword:queryKeyword}})
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);

    };
    const handleOpenUserMenu = (event, page) => {
        setAnchorElUser(event.currentTarget);

    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);

    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);

    };

    const handleLog = (log) => {
        if (log === "Logout") {
            navigate('/login-page');
            // setIsTokenExist(false);
            localStorage.removeItem('aniflix_token');
            localStorage.removeItem('aniflix_animeId');
            localStorage.removeItem('aniflix_episodeId');
        } else {
            setIsTokenExist(true);
            navigate('/login-page');
        }

    }

    const handleNavigation = (page) => {
        if (page === "Profile") {
            navigate('/user-profile');
        } else if (page === "Room") {
            navigate('/create-room');
        }
    };

    const handleUserProfile = () => {
        navigate('/');
    };
    const isSmallerScreen = useMediaQuery("(max-width:720px)");
    




    return (
        <AppBar position="static" sx={{ backgroundColor: isSmallerScreen ? '#1976d2t' : '#191919'  }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        style={{
                            backgroundColor: "#1976d2",
                            width: 50,
                            height: 50,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Avatar
                            src={logo}
                            sx={{
                                display: { xs: "none", md: "flex" },
                                width: 90,
                                cursor: "pointer"
                            }}
                            onClick={handleUserProfile}
                        />
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" }
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => { handleNavigation(page); handleCloseNavMenu(); }} >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}

                        </Menu>
                    </Box>


                    <Avatar src={logo} sx={{ display: { xs: "flex", md: "none" }, mr: 1, width: 100 }} />
                    
                

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleNavigation(page)}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    
                    <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", marginRight: 5, }}>
                        {/* <TextField
                            id="outlined-basic"
                            label="Search"
                            variant="outlined"
                            value={queryKeyword}
                            onChange={(e) => setQueryKeyword(e.target.value)}
                            size="small"
                            sx={{ mr: 1, backgroundColor:"#4D4D4D", borderRadius:5, opacity:1, width: isSmallerScreen ? 100 : 300 }}
                            
                        /> */}
                        <Button onClick={handleSearch} size="small" sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
                            Search Page
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color:"white" }}>
                                <MenuIcon alt="manu" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {isTokenExist ? (
                                logoutSettings.map((logout) => (
                                    <MenuItem key={logout} onClick={() => { handleCloseUserMenu(); handleLog(logout) }}>
                                        <Typography textAlign="center">{logout}</Typography>
                                    </MenuItem>
                                ))
                            ) : (
                                loginSettings.map((login) => (
                                    <MenuItem key={login} onClick={() => { handleCloseUserMenu(); handleLog(login) }}>
                                        <Typography textAlign="center">{login}</Typography>
                                    </MenuItem>
                                ))
                            )}

                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default NavBar