import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../handlers/AuthContext';

const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

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
            // Mock API call
            // const [credentials, setCredentials] = useState({ username: '', password: '' });
            // const [error, setError] = useState('');
            // setCredentials({ ...credentials, password: e.target.value })
            // if (credentials.username === 'user' && credentials.password === 'password123') {
            //     login({ username: credentials.username });
            //     navigate('/account');
            // } else {
            //     setError('Invalid username or password');
            // }
            let auth = login(email, password)
            if (auth) {
                console.log('Login successful');
                // console.log(auth)
            }
            else { alert("Authentication Failed") }
            navigate('/account')
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
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
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} validate="true" sx={{ mt: 1 }}>
                        {/* {error && <Typography color="error">{error}</Typography>} */}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && <Alert variant="filled" severity="error">{emailError}</Alert>}
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
                        {passwordError && <Alert variant="filled" severity="error">{passwordError}</Alert>}

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
                        <Button
                            variant="outlined"
                            component={Link} to="/signup"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            {"Don't have an account? Sign Up"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

