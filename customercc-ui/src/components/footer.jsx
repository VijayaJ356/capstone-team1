
import React from 'react';
import { Link, Typography } from '@mui/material';

export const Copyright = (props) => {
    return (
        <Typography variant="body2" color="primary" sx={{ bottom: 0, width: "100%" }} {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://tech.walmart.com/">
                Walmart Global Tech
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
