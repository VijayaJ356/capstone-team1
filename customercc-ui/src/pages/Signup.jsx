import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, MenuItem, Box, Container, Avatar, CssBaseline, Snackbar, Alert } from '@mui/material'
import Grid from '@mui/material/Grid2'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../handlers/AuthContext';
import { ThemeProviderAuto } from '../handlers/Theme';

import axios from "axios";
import dayjs from "dayjs";

import { users } from '../data/users'

// const defaultTheme = createTheme();


export default function SignUp() {
    const navigate = useNavigate();
    const { loggedInUser } = useAuth();

    // States for form input values and error messages
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
        address: {
            houseNo: "",
            street: "",
            city: "",
            pin: "",
            state: "",
            country: "",
        },
    });
    const [errors, setErrors] = useState({})

    if (loggedInUser) { navigate('/profile') }


    // Validate Date of Birth
    const validateDOB = (value) => {
        const [year, month, day] = value.split("-").map(Number);

        // Ensure the year is a 4-digit number
        const fullYear = year < 100 ? `20${year}` : year;

        const enteredDate = dayjs(`${fullYear}-${month}-${day}`);
        if (!enteredDate.isValid()) {
            return "Invalid date.";
        }

        const today = dayjs();
        const age = today.diff(enteredDate, "year");

        if (age < 18) {
            return "User must be at least 18 years old.";
        }
        if (age > 120) {
            return "Invalid age. Please enter a realistic date of birth.";
        }

        return ""; // No errors
    };

    // Function to dynamically handle changes in all input fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        errors[name] = ""

        // Update form data
        if (name.includes("name.")) {
            const [, key] = name.split(".");
            formattedvalue = value.replace(/[^a-zA-Z]/g, "");    // Remove any non-alphabets

            // if (!(/^(?=.{6,})/.test(formattedvalue))) {
            //     errors[name] = 'Please enter min 6 chars'
            // }

            setForm((prev) => ({
                ...prev,
                name: { ...prev.name, [key]: formattedvalue },
            }));
        }
        else if (name === "email") {
            setForm({ ...form, [name]: value });

            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))) {
                errors[name] = 'Please enter valid email'
            } else {
                const emailmatch = users.some((u) => u.email == value);
                if (emailmatch) {
                    errors[name] = 'Email Already Present'
                }
            }
        }
        else if (name === "username") {
            setForm({ ...form, [name]: value });
            // const formattedvalue = value
            // .replace(/^(?=.{6,})/, "")
            if (!(/^(?=.{6,})/.test(value))) {
                errors[name] = 'Please enter min 6 chars'
            } else {
                // Check if username already exists
                const usernamematch = users.some((u) => u.username == value);
                if (usernamematch) {
                    errors[name] = 'User Already Present'
                }
            }
        }
        else if (name === "password") {
            const formattedvalue = value
                .replace(/^(?=.*[!@#$%^&*])(?=.{6,})/, "")

            setForm({ ...form, [name]: formattedvalue });

            if (!(/^(?=.*[!@#$%^&*])(?=.{6,})/.test(formattedvalue))) {
                errors[name] = "Please have 1 special character and min 6 chars"
            }
        }
        else if (name === "dob") {
            setForm({ ...form, [name]: value });
            errors[name] = validateDOB(value);
        }
        else if (name.includes("address.")) {
            const [, key] = name.split(".");
            var formattedvalue = value
            if (key == "pin") {
                formattedvalue = value
                    .replace(/\D/g, "") // Remove Non-Digits
                    .slice(0, 6);
                if (formattedvalue.length < 6) {
                    errors[name] = 'Please enter min 6 digits'
                }
            }
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: formattedvalue },
            }));
        }
        else {
            setForm({ ...form, [name]: value });
        }

        setErrors(errors)

    };

    // Validate if there are any pending errors for any input field in the form
    const validateForm = () => {
        const newErrors = {}

        // Revalidating username and email
        if (users.some((u) => u.username == form.username)) {
            errors["username"] = 'User Already Present'
        }
        if (users.some((u) => u.email == form.email)) {
            errors["email"] = 'Email Already Present'
        }
        setErrors(errors)

        Object.keys(errors).forEach(item => {
            if (errors[item] != "") {
                newErrors[item] = errors[item]
            }
        })
        return Object.keys(newErrors).length === 0;
    }

    const [registered, setRegistered] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (registered) {
            setOpenSnackbar(true); // Show the alert
            // Close Banner after 2 seconds
            const timer = setTimeout(() => {
                setOpenSnackbar(false);
            }, 3000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [registered]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Registered successfully');
            alert('Registered successfully');
            setRegistered(!registered)

            console.log(form)

            // Add the new user to the users array
            users.push(form);

            // Send data to API
            try {
                const response = await axios.post("http://51.8.188.255:9095/api/customer/register", form);
                if (response.data.match("already exists")) {
                    console.log("[API]", response.data);
                } else {
                    console.log("[API] Customer registered successfully:", response.data);
                }

            } catch (error) {
                console.error("[API] Error registering customer:", error);
            }

            navigate('/login')
            // Login with newly register account
            // let auth = login(form.email, form.password)
            // if (auth) {
            //     console.log('Login successful');
            //     navigate('/profile')
            // }
            // else { alert("Authentication Failed") }
        }
    };

    return (
        <ThemeProviderAuto>
            <Container component="main" maxWidth="xs">
                <Snackbar
                    open={openSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="success" sx={{ width: "100%" }}>
                        Registered Successfully
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    sx={{ marginTop: 8 }}
                >
                    <Alert severity="success" sx={{ width: "100%" }}>
                        {`Welcome ${form.username}!`}
                    </Alert>
                </Snackbar>

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
                        <TextField required label="First Name" name="name.first" value={form.name.first} fullWidth margin="normal" onChange={handleChange}
                            error={!!errors["name.first"]}
                            helperText={errors["name.first"]}
                            autoFocus />
                        <TextField required label="Last Name" name="name.last" value={form.name.last} fullWidth margin="normal" onChange={handleChange}
                            error={!!errors["name.last"]}
                            helperText={errors["name.last"]}
                            autoFocus />
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
                            error={!!errors["email"]}
                            helperText={errors["email"]}
                        />
                        {/* {errors["email"] && <Alert variant="filled" severity="error">{errors["email"]}</Alert>} */}
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
                            error={!!errors["username"]}
                            helperText={errors["username"]}
                            autoFocus
                        />
                        {/* {errors["username"] && <Alert variant="filled" severity="error">{errors["username"]}</Alert>} */}
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
                            error={!!errors["password"]}
                            helperText={errors["password"]}
                        />
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
                            <MenuItem value="OTHER">Other</MenuItem>
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
                            error={!!errors["dob"]}
                            helperText={errors["dob"]}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
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
                                    error={!!errors["address.pin"]}
                                    helperText={errors["address.pin"]}
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
        </ThemeProviderAuto>
    );
}

