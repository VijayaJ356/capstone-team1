import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, MenuItem, Box, FormControlLabel, Checkbox, Container, Alert, Avatar, CssBaseline } from '@mui/material'
import Grid from '@mui/material/Grid2'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../handlers/AuthContext';
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove"

import axios from "axios";

import { users } from '../data/users'

const defaultTheme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();

    if (loggedInUser) { navigate('/profile') }

    // States for form input values and error messages
    // const [errors, setErrors] = useState({});
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [form, setForm] = useState({
        name: {
            first: '',
            last: ''
        },
        email: '',
        username: '',
        password: '',
        dob: null,
        sex: '',
        // creditCards: [],
        customerId: "112",
        address: {
            houseNo: "",
            street: "",
            city: "",
            pin: "",
            state: "",
            country: "",
        },
        active: false,
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        // // Validate username length
        // if (name === "username") {
        //     if (value.length < 6) {
        //         setErrors((prev) => ({ ...prev, username: "Username must be at least 6 characters." }));
        //     } else {
        //         setErrors((prev) => ({ ...prev, username: "" }));
        //     }
        // }

        // Update form data
        if (name.includes("name.")) {
            const [, key] = name.split(".");
            setForm((prev) => ({
                ...prev,
                name: { ...prev.name, [key]: value },
            }));
        } else if (name.includes("address.")) {
            const [, key] = name.split(".");
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value },
            }));
        } else if (name === "active") {
            setForm((prev) => ({ ...prev, active: e.target.checked }));
        }
        else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    // Validation functions
    const validateUserName = (username) => {
        const usernameRegex = /^(?=.{6,})/;  // Simple regex for username
        return usernameRegex.test(username);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Simple regex for email
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.{6,})/; // At least 6 chars and 1 special char
        return passwordRegex.test(password);
    };

    const handleSignUp = async (e) => {
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
            // Check if username already exists
            const usernamematch = users.some((u) => u.username == username);
            const emailmatch = users.some((u) => u.email == email);
            if (emailmatch) {
                setEmailError('Email Already Present');
                valid = false;
            } else if (usernamematch) {
                setUsernameError('User Already Present');
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

        // if (!validateCards()) {
        //     valid = false;
        // }

        if (valid) {
            console.log('Registered successfully');
            alert('Registered successfully');

            // setForm({ ...form, ["sex"]: form.sex.toUpperCase() });

            console.log(form)

            // Add the new user to the users array
            users.push(form);

            try {
                const response = await axios.post("http://localhost:9095/api/customer/register", form);
                console.log("Customer registered successfully:", response.data);
            } catch (error) {
                console.error("Error registering customer:", error);
            }

            // Send data to API
            // fetch("http://localhost:9095/api/customer/register", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(form),
            // })
            //     .then((response) => response.json())
            //     .then((data) => console.log("Update successful:", data))
            //     .catch((error) => console.error("Error updating user:", error));

            // Login with newly register account
            // let auth = login(form.email, form.password)
            // if (auth) {
            //     console.log('Login successful');
            //     navigate('/profile')
            // }
            // else { alert("Authentication Failed") }
        }
    };

    /*
        const [cards, setCards] = useState([{ id: 1, value: "" }]);
    
        //Handle input change with auto-formatting
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
    */

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
                        <TextField required label="First Name" name="name.first" value={form.name.first} fullWidth margin="normal" onChange={handleChange} autoFocus />
                        <TextField required label="Last Name" name="name.last" value={form.name.last} fullWidth margin="normal" onChange={handleChange} autoFocus />
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
                            <MenuItem value="MALE">Male</MenuItem>
                            <MenuItem value="FEMALE">Female</MenuItem>
                            <MenuItem value="TRANSGENDER">Transgender</MenuItem>
                            {/* <MenuItem value="Don't want to disclose">NA</MenuItem> */}
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
                        {/* <Grid container spacing={0}>
                            {cards.map((card, index) => (
                                <Grid item size={12} key={card.id}>
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
                            <Grid item size={12}>
                                <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                                    Add new credit card
                                </Typography>
                                <IconButton onClick={addCard} type="button" color="primary" sx={{ ml: 1 }}>
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid> */}

                        <Typography style={{ textAlign: "left" }}>Address</Typography>
                        <Grid container spacing={2}>
                            <Grid item size={12} sm={8}>
                                <TextField
                                    label="House No"
                                    name="address.houseNo"
                                    value={form.address.houseNo}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item size={12} sm={8}>
                                <TextField
                                    label="Street"
                                    name="address.street"
                                    value={form.address.street}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item size={12} sm={6}>
                                <TextField
                                    label="City"
                                    name="address.city"
                                    value={form.address.city}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item size={12} sm={6}>
                                <TextField
                                    label="PIN"
                                    name="address.pin"
                                    value={form.address.pin}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item size={12} sm={6}>
                                <TextField
                                    label="State"
                                    name="address.state"
                                    value={form.address.state}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid item size={12} sm={6}>
                                <TextField
                                    label="Country"
                                    name="address.country"
                                    value={form.address.country}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            {/* Active Checkbox */}
                            <Grid item size={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="active"
                                            checked={form.active}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Active"
                                />
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

