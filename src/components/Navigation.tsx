import React from "react";
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

const Navigation = () => {
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
                            <a href="#testimonials" className="nav-link page-scroll">
                                Testimonials
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#team" className="nav-link page-scroll">
                                Team
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#contact" className="nav-link page-scroll">
                                Contact
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link page-scroll">
                                <Button variant="contained" color="primary" startIcon={<LoginIcon />}>
                                    Login
                                </Button>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/register" className="nav-link page-scroll">
                                <Button variant="contained" color="primary" startIcon={<LoginIcon />}>
                                    Register
                                </Button>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;