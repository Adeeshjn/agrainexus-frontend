import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import jwtDecode from 'jwt-decode';
import { Logout } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';

const Navigation = () => {

    const [userName, setUserName] = useState('')

    useEffect(() => {
        getUserName();
    }, []);

    const getUserName = () => {
        let token = localStorage.getItem("token");
        if (token) {
            try {
                let decodedToken: any = jwtDecode(token);
                setUserName(decodedToken.UserName);
            } catch (error) {
                console.error("Error decoding token:", error);
                localStorage.setItem("token", "");
                setUserName("");
            }
        }
    };

    const handleLogout = () => {
        localStorage.setItem('token', '');
        window.location.reload();
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                    >
                        <span className="sr-only">Toggle navigation</span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                    </button>
                    <a className="navbar-brand page-scroll" href="/">
                        AGRAINEXUS
                    </a>{" "}
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">
                        <li className="nav-item">
                            <a href="#about" className="nav-link page-scroll">
                                About
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#services" className="nav-link page-scroll">
                                Services
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#team" className="nav-link page-scroll">
                                Team
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#testimonials" className="nav-link page-scroll">
                                Testimonials
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link page-scroll">
                                Contact
                            </a>
                        </li>
                        {userName ? (
                            <>
                                <li className="nav-item">
                                    <Tooltip title="Account settings" arrow>
                                        <IconButton
                                            onClick={handleClick}
                                            size="medium"
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{color:'blue', bgcolor:'green'}}>{userName.charAt(0).toUpperCase()}</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem style={{fontSize:'15px'}}>
                                            <AccountCircleIcon fontSize="medium" />
                                            Profile
                                        </MenuItem>
                                        <MenuItem style={{fontSize:'15px'}} onClick={handleClose}>
                                            <KeyIcon fontSize="medium"/>
                                            Change Password
                                        </MenuItem>
                                        <MenuItem style={{fontSize:'15px'}} onClick={handleLogout}>
                                            <Logout fontSize="medium" />
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link page-scroll">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<LoginIcon />}
                                        >
                                            Login
                                        </Button>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/register" className="nav-link page-scroll">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<LoginIcon />}
                                        >
                                            Register
                                        </Button>
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;