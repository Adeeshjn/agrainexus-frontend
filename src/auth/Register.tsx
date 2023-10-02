import React, { useRef, useState } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
    InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginImage from '../images/about.jpg';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../constants/static';
import postApi from '../api/PostApi';
import { toast } from 'react-toastify';

const customTheme: any = createTheme({
    palette: {
        primary: {
            main: '#3F51B5', // Replace with your desired primary color
        },
        secondary: {
            main: '#3F51B5', // Replace with your desired secondary color
        },
    },
});

const styles: any = {
    root: {
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#ffffff', // Optional: You can set a background color for the form area
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)', // Optional: Add some shadow to the form
    },
    avatar: {
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: customTheme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '8px',
    },
    submit: {
        margin: '24px 0 16px',
        backgroundColor: customTheme.palette.primary.main,
        color: '#fff',
        borderRadius: '4px',
        padding: '12px 20px',
        cursor: 'pointer',
        fontSize: '15px'
    },
    image: {
        width: '50%', // Set the desired image width
        height: '100%', // Set the desired image height
        objectFit: 'cover', // Adjust this to control how the image fits inside the container
    },
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const formRef: any = useRef(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
    };

    const handleUserNameChange = (e: any) => {
        setUserName(e.target.value);
    }

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(formRef.current) {
            const isFormValid = formRef.current.checkValidity();
            if(isFormValid) {
                let item = { userName: userName, email: email, password: password }
                let body = {
                    Url: API_URLS.register,
                    body: item,
                    isAuth: false
                }
                try {
                    let response: any = await postApi(body, setIsLoading)
                    if(response.data) {
                        toast.success("Registration successfull!", { 
                            position: toast.POSITION.TOP_CENTER 
                        })
                        setTimeout(() => {
                            navigate("/login");
                          }, 5000);
                    }
                } catch (error: any) {
                    toast.error(error, {
                        position: toast.POSITION.TOP_CENTER
                    });
                } finally {
                    setIsLoading(false)
                }
            }
            else {
                toast.error("Enter the details correctly", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    };

    return (
        <ThemeProvider theme={customTheme}>
            <div style={styles.root}>
                <img
                    src={LoginImage} // Replace with the actual path to your image file
                    alt="LoginImage"
                    style={styles.image}
                />
                <Container component="main" maxWidth="xs" style={styles.formContainer}>
                    <CssBaseline />
                    <div>
                        <Avatar style={styles.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography style={{ textAlign: 'center', paddingTop: '5px', fontSize: '20px' }} component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form ref={formRef} style={styles.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                placeholder='User Name'
                                name="userName"
                                autoComplete="userName"
                                value={userName}
                                onChange={handleUserNameChange}
                                InputProps={{
                                    style: {
                                        fontSize: '16px', // Set your desired font size here
                                    },
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                placeholder='Email Address'
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={handleEmailChange}
                                InputProps={{
                                    style: {
                                        fontSize: '16px', // Set your desired font size here
                                    },
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                placeholder='Password'
                                type={showPassword ? 'password' : 'text'}
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={handlePasswordChange}
                                InputProps={{
                                    style: {
                                        fontSize: '16px', // Set your desired font size here
                                    },
                                    endAdornment: (
                                        <InputAdornment style={{ cursor: 'pointer' }} position="end">
                                            {showPassword ? (
                                                <VisibilityIcon onClick={togglePasswordVisibility} />
                                            ) : (
                                                <VisibilityOffIcon onClick={togglePasswordVisibility} />
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="ConfirmPassword"
                                label="Confirm Password"
                                placeholder='Confirm Password'
                                type={showConfirmPassword ? 'password' : 'text'}
                                id="confirmpassword"
                                autoComplete="current-password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                InputProps={{
                                    style: {
                                        fontSize: '16px', // Set your desired font size here
                                    },
                                    endAdornment: (
                                        <InputAdornment style={{ cursor: 'pointer' }} position="end">
                                            {showConfirmPassword ? (
                                                <VisibilityIcon onClick={toggleConfirmPasswordVisibility} />
                                            ) : (
                                                <VisibilityOffIcon onClick={toggleConfirmPasswordVisibility} />
                                            )}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button type="submit" fullWidth variant="contained" style={styles.submit}>
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href='/login' style={{ cursor: 'pointer', textDecoration: 'none' }}>
                                        Already have an account? Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default Register;
