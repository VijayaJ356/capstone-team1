import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Typography,
    CircularProgress,
    Alert,
    Button,
    Box,
} from '@mui/material';

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState({ loading: true, message: '', success: false });

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // Call the backend API to verify the email
            axios
                .get(`/verify-email?token=${token}`)
                .then((response) => {
                    setStatus({ loading: false, message: response.data, success: true });
                })
                .catch((error) => {
                    const errorMessage = error.response?.data || 'An error occurred while verifying the email.';
                    setStatus({ loading: false, message: errorMessage, success: false });
                });
        } else {
            setStatus({
                loading: false,
                message: 'Invalid or missing verification token.',
                success: false,
            });
        }
    }, [searchParams]);

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            {status.loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <CircularProgress />
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Verifying your email, please wait...
                    </Typography>
                </Box>
            ) : (
                <>
                    {status.success ? (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            {status.message}
                        </Alert>
                    ) : (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {status.message}
                        </Alert>
                    )}

                    {status.success && (
                        <Button
                            variant="contained"
                            color="primary"
                            href="/home"
                            sx={{ mt: 2 }}
                        >
                            Go to Home
                        </Button>
                    )}
                </>
            )}
        </Container>
    );
};

export default EmailVerification;
