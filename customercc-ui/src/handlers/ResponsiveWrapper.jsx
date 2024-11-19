import { Grid2 } from '@mui/material';

// eslint-disable-next-line react/prop-types
const ResponsiveWrapper = ({ children }) => (
    <Grid2 container justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
        <Grid2 item xs={12} sm={8} md={6}>
            {children}
        </Grid2>
    </Grid2>
);

export default ResponsiveWrapper;
