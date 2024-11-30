import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Snackbar, Alert } from '@mui/material';

// ProtectedRoute component will check if user is authenticated
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { loggedInUser } = useAuth();
    const navigate = useNavigate(); // For navigation
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        if (!loggedInUser) {
            setOpenSnackbar(true); // Show the alert
            // Redirect after 2 seconds
            const timer = setTimeout(() => {
                setOpenSnackbar(false);
                navigate("/login", { replace: true });
            }, 2000);
            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [loggedInUser, navigate]);

    if (!loggedInUser) {
        // Delay redirection to show the alert
        return (
            <>
                {/* Render Snackbar even before navigating */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={2000}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="warning" sx={{ width: "100%" }}>
                        No user logged in!! Redirecting to Login page...
                    </Alert>
                </Snackbar>
            </>
        );
    }

    // Render the protected content if user is authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
