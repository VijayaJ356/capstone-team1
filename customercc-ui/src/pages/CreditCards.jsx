
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import AddCreditCard from '../handlers/AddCreditCard';
import { cards } from '../data/creditcards'
import { useAuth } from '../handlers/AuthContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const CreditCards = () => {
    const navigate = useNavigate()
    const { loggedInUser } = useAuth();
    const usercards = cards.find(item => item.username == loggedInUser.username)
    // console.log(usercards)
    // const [responseData, setResponseData] = useState(null)

    // const Get_Cards = async () => {
    //     await axios
    //         .get(`http://localhost/getcards`)
    //         .then((response) => {
    //             setResponseData(response.data)
    //             console.log(response)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    function routetoaccount() {
        navigate('/account')
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box>
                {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 400, margin: 'auto' }}> */}
                <Button sx={{ marginTop: 5 }} type="button" onClick={routetoaccount}>Back to Profile</Button>

                {usercards && usercards.credit_card.map((card, index) => (
                    <Card key={index} spacing="2">
                        <CardContent>
                            <Typography variant="h6">{`Card Number: ${card.cardNumber}`}</Typography>
                            <Typography variant="body2">{`Name: ${usercards.nameOnTheCard}`}</Typography>
                            <Typography variant="body2">{`Valid From: ${card.valid_from} | Expiry: ${card.expiry}`}</Typography>
                            <Typography variant="body2">{`${card.cardType}`}</Typography>
                            <Typography variant="body2">{`${card.status}`}</Typography>
                        </CardContent>
                    </Card>
                ))}
                {/* <div style={{ marginTop: 50 }}></div> */}
                <AddCreditCard />
            </Box>
        </ThemeProvider >
    );
};

export { CreditCards };
