// import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
// import Alert from '@mui/material/Alert';

// ProtectedRoute component will check if user is authenticated
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        console.log("No User Authenticated, redirecting to login page")
        return <Navigate to="/login" />
    }
    console.log("Authenticated", isAuthenticated)
    return children
};

export default ProtectedRoute;
