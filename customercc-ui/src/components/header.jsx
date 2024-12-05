import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../handlers/AuthContext'; // Custom Auth hook for context
import { Link, useNavigate } from 'react-router-dom'; // For navigation

const Header = () => {
    const navigate = useNavigate()
    const { loggedInUser, logout } = useAuth(); // Use auth context to get login state and logout function

    function routetoprofile() {
        navigate('/profile')
    }

    return (
        <AppBar position="fixed" sx={{ mb: 10 }}>
            <Toolbar >
                {/* Left side: App name or logo */}
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    <Button size="large" color="inherit" component={Link} to="/home">
                        Credit Card Manager
                    </Button>
                </Typography>

                {/* Right side: Login/Logout buttons */}
                <Box >
                    {!loggedInUser ? (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/signup">
                                Signup
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography variant="body1" color="inherit" sx={{ marginRight: 2 }}>
                                Welcome, {loggedInUser?.name.first}
                            </Typography>
                            <Button color="inherit" onClick={routetoprofile}>
                                Profile
                            </Button>
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>

                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
