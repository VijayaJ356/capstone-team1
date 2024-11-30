import { useNavigate } from 'react-router-dom';
import { useAuth } from '../handlers/AuthContext';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Button
} from "@mui/material";

import Grid from "@mui/material/Grid2"

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import CreditCards from '../pages/CreditCards';

const Account = () => {
    const navigate = useNavigate()
    const { loggedInUser } = useAuth();

    console.log(loggedInUser)

    function routetocards() {
        navigate('/cards')
    }

    return (
        <Box
        // sx={{
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     minHeight: "100vh",
        //     backgroundColor: "#f5f5f5",
        //     padding: 4,
        // }}
        >
            <Card
                sx={{
                    width: { xs: "100%", sm: "75%", md: "100%" },
                    boxShadow: 3,
                    padding: 3,
                    alignItems: "center",
                }}
            >

                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        {/* Profile Picture */}
                        <Grid item size={12} sx={{ textAlign: "center" }}>
                            <Avatar
                                sx={{
                                    width: 80,
                                    height: 80,
                                    margin: "0 auto",
                                    backgroundColor: "#3f51b5",
                                }}
                            >
                                <AccountCircleIcon sx={{ fontSize: 60 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ mt: 1 }}>
                                User Profile
                            </Typography>
                        </Grid>

                        {/* Profile Details */}
                        <Grid item size={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Name:
                            </Typography>
                            <Typography variant="body1">{loggedInUser.name}</Typography>
                        </Grid>

                        <Grid item size={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Email:
                            </Typography>
                            <Typography variant="body1">{loggedInUser.email}</Typography>
                        </Grid>

                        <Grid item size={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Sex:
                            </Typography>
                            <Typography variant="body1">{loggedInUser.sex}</Typography>
                        </Grid>

                        <Grid item size={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Username:
                            </Typography>
                            <Typography variant="body1">{loggedInUser.username}</Typography>
                        </Grid>

                        <Grid item size={12}>
                            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                Date of Birth:
                            </Typography>
                            <Typography variant="body1">{loggedInUser.dob}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Button onClick={routetocards}>Credit Cards</Button>
        </Box>
    )
}

export default Account;