import { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, TextField, Typography, MenuItem, Box, Grid, IconButton, InputAdornment } from '@mui/material'
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
// import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useAuth } from '../handlers/AuthContext';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove"

import { users } from '../data/users'

const defaultTheme = createTheme();

export default function SignUp() {
    // const navigate = useNavigate();
    // const { login } = useAuth();

    // States for form input values and error messages
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Validation functions
    const validateUserName = (username) => {
        const emailRegex = /^(?=.{6,})/;  // Simple regex for username
        return emailRegex.test(username);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple regex for email
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{6,})/; // At least 6 chars and 1 special char
        return passwordRegex.test(password);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        let valid = true;

        const data = new FormData(e.currentTarget);
        const email = data.get('email')
        const password = data.get('password')
        const username = data.get('username')

        // Validate email
        if (!validateEmail(email)) {
            setEmailError('Please enter valid email');
            valid = false;
        } else {
            setEmailError('');
        }

        // Validate username
        if (!validateUserName(username)) {
            setUsernameError('Please enter min 6 chars');
            valid = false;
        } else {
            const usernamematch = users.find((u) => u.username == username);
            const emailmatch = users.find((u) => u.email == email);
            if (usernamematch) {
                setUsernameError('User Already Present');
                valid = false;
            } else if (emailmatch) {
                setEmailError('Email Already Present');
                valid = false;
            } else {
                setUsernameError('');
            }
        }

        // Validate password
        if (!validatePassword(password)) {
            setPasswordError('Please have 1 special character and min 6 chars');
            valid = false;
        } else {
            setPasswordError('');
        }

        if (!validateCards()) {
            valid = false;
        }

        if (valid) {
            console.log('Registered successfully');
            console.log(form);
            alert('Registered successfully');

            // Login with newly register account
            // let auth = login(form.email, form.password)
            // if (auth) {
            //     console.log('Login successful');
            //     navigate('/account')
            // }
            // else { alert("Authentication Failed") }
        }
    };

    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        dob: null,
        sex: '',
        creditCards: [],
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [cards, setCards] = useState([{ id: 1, value: "" }]);
    const [errors, setErrors] = useState({});

    // Handle input change with auto-formatting
    const handleCardChange = (id, value) => {
        // Allow only digits and format input as "xxxx-xxxx-xxxx-xxxx"
        let sanitizedValue = value.replace(/\D/g, ""); // Remove non-digits
        sanitizedValue = sanitizedValue
            .match(/.{1,4}/g)
            ?.join("-")
            .slice(0, 19) || ""; // Add hyphens and limit to 16 digits

        setCards((prev) =>
            prev.map((card) =>
                card.id === id ? { ...card, value: sanitizedValue } : card
            )
        );
    };

    // Validate card entries
    const validateCards = () => {
        const newErrors = {};
        const cardValues = cards.map((card) => card.value);

        cards.forEach((card) => {
            const value = card.value.replace(/-/g, ""); // Remove hyphens for validation
            if (!/^\d{16}$/.test(value)) {
                newErrors[card.id] = "Card number must be 16 digits.";
            } else if (value === "0000000000000000") {
                newErrors[card.id] = "Card number cannot be all zeros.";
            } else if (cardValues.filter((v) => v === card.value).length > 1) {
                newErrors[card.id] = "Card number must be unique.";
            }
        });

        setForm({ ...form, ["creditCards"]: cardValues });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Add a new card input
    const addCard = () => {
        setCards((prev) => [
            ...prev,
            { id: Date.now(), value: "" }, // Unique ID for new card
        ]);
    };

    // Remove a specific card input
    const removeCard = (id) => {
        setCards((prev) => prev.filter((card) => card.id !== id));
        setErrors((prevErrors) => {
            // eslint-disable-next-line no-unused-vars
            const { [id]: _, ...remainingErrors } = prevErrors; // Remove errors for the removed card
            return remainingErrors;
        });
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
                        Sign Up
                    </Typography>
                    <Box component="form" onSubmit={handleSignUp} validate="true" sx={{ mt: 1 }}>
                        <TextField required label="Name" name="name" fullWidth margin="normal" onChange={handleChange} autoFocus />
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
                            value={form.email}
                            onChange={handleChange}
                        />
                        {emailError && <Alert variant="filled" severity="error">{emailError}</Alert>}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="outlined"
                            name="username"
                            label="UserName"
                            type="username"
                            id="username"
                            autoComplete="username"
                            value={form.username}
                            onChange={handleChange}
                            autoFocus
                        />
                        {usernameError && <Alert variant="filled" severity="error">{usernameError}</Alert>}
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
                            value={form.password}
                            onChange={handleChange}
                        />
                        {passwordError && <Alert variant="filled" severity="error">{passwordError}</Alert>}
                        <TextField
                            required
                            label="Sex"
                            name="sex"
                            select
                            fullWidth
                            margin="normal"
                            value={form.sex}
                            onChange={handleChange}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Don't want to disclose">NA</MenuItem>
                        </TextField>
                        <TextField
                            required
                            margin="normal"
                            label="Date of Birth"
                            name="dob"
                            type="date"
                            value={form.dob}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                        {/* <TextField
                            required
                            label="Credit Card Numbers"
                            name="creditCards"
                            multiline
                            fullWidth
                            margin="normal"
                            onChange={handleChange}
                        /> */}
                        {/* <CreditCardForm /> */}
                        <Grid container spacing={0}>
                            {cards.map((card, index) => (
                                <Grid item xs={12} key={card.id}>
                                    <TextField
                                        label={`Credit Card ${index + 1}`}
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={card.value}
                                        onChange={(e) => handleCardChange(card.id, e.target.value)}
                                        error={!!errors[card.id]}
                                        helperText={errors[card.id] || ""}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => removeCard(card.id)}
                                                        color="error"
                                                        edge="end"
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                                    Add new credit card
                                </Typography>
                                <IconButton onClick={addCard} type="button" color="primary" sx={{ ml: 1 }}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Button
                            variant="outlined"
                            component={Link} to="/login"
                            sx={{ mt: 1, mb: 2 }}
                        >
                            {"Already Registered?, Sign In"}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

