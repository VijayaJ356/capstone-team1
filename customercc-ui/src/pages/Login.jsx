import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../provider/authProvider";

// import { useAuth } from '../handlers/auth';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://tech.walmart.com/">
                Walmart Global Tech
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     const email = data.get('email')
    //     const password = data.get('password')

    //     console.log({
    //         username: data.get('username'),
    //         password: data.get('password'),
    //     });
    // };

    // const { login } = useAuth();

    // States for form input values and error messages
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple regex for email
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{6,})/; // At least 6 chars and 1 special char
        return passwordRegex.test(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        let valid = true;

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Please have 1 special character and min 6 chars');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (valid) {
            // login();
            // Perform login operation (e.g., call an API)
            console.log('Login successful');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Typography component="h1" variant="h4">
                    Customer Credit Card
                </Typography>
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
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} Validate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            name="email"
                            label="Email"
                            type="email"
                            id="email"
                            autoComplete="email"
                            autoFocus
                            value={password}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <div className="error-message">{emailError}</div>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="error-message">{passwordError}</div>}

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item xs>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

