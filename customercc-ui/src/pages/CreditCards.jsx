
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import Grid from "@mui/material/Grid2"
import AddCreditCard from '../handlers/AddCreditCard';
import { cards } from '../data/creditcards'
import { useAuth } from '../handlers/AuthContext';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import visaIcon from '../assets/icons/visa.png';
import masterCardIcon from '../assets/icons/mastercard.png';
import rupayIcon from '../assets/icons/rupay.png';
import amexIcon from '../assets/icons/american-express.png';
import defaultIcon from '../assets/icons/default.png';


const CreditCards = () => {
    const navigate = useNavigate()
    const { loggedInUser } = useAuth();
    const [usercardslist, setUserCardsList] = useState((cards.find(item => item.username == loggedInUser.username)).credit_card);
    const [openAddCard, setOpenAddCard] = useState(false);

    const handleAddCard = (newCard) => {
        setUserCardsList([...usercardslist, newCard]);
    };

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

    function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)) }


    const [showCardNumber, setShowCardNumber] = useState({}); // Track visibility of CardNumber for each card

    // Toggle CardNumber visibility for a specific card
    const toggleCardNumber = (id) => {
        setShowCardNumber((prev) => ({ ...prev, [id]: !prev[id] }));
        setTimeout(() => { setShowCardNumber((prev) => ({ ...prev, [id]: !prev[id] })) }, 5000)
    };

    const [showCVV, setShowCVV] = useState({}); // Track visibility of CVV for each card

    // Toggle CVV visibility for a specific card
    const toggleCVV = async (id) => {
        setShowCVV((prev) => ({ ...prev, [id]: !prev[id] }));
        await sleep(5000)
        setShowCVV((prev) => ({ ...prev, [id]: !prev[id] }));
    };


    function toggleStatus(card) {
        let usercard = usercards.credit_card.find(item => { item.cardNumber == card.cardNumber })

        if (card.status == "disabled") { card.status = "enabled" }
        else if (card.status == "enabled") { card.status = "disabled" }
        console.log(card.status, card["status"], card.cardNumber, usercards.credit_card, usercard)
    };

    const getwireTransactionVendorStyle = (type) => {
        switch (type.toLowerCase()) {
            case "american express":
                return "#60a5fa, #1e40af"
            case "visa":
                return "#60a5fa, #1e40af"
            case "mastercard":
                return "#f87171, #991b1b"
            case "rupay":
                return "#f87171, #991b1b"
            default:
                return "#60a5fa, #1e40af"
        }
    }

    const getCardIcon = (wireTransactionVendor) => {
        switch (wireTransactionVendor) {
            case 'VISA':
                return visaIcon;
            case 'MasterCard':
                return masterCardIcon;
            case 'Rupay':
                return rupayIcon;
            case 'American Express':
                return amexIcon
            default:
                return defaultIcon;
        }
    };

    return (
        <>
            <Button sx={{ marginTop: 10, marginBottom: 2 }} type="button" onClick={routetoaccount}>Back to Profile</Button>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                    padding: 3,
                }}
            >
                {loggedInUser && usercards && usercardslist.map((card, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 400,
                            height: 230,
                            position: "relative",
                            color: "#fff",
                            background: `linear-gradient(135deg, ${getwireTransactionVendorStyle(card.wireTransactionVendor)})`,
                            borderRadius: 2,
                            boxShadow: 5,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: 1,
                        }}
                    >
                        <CardContent>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: "1rem",
                                    letterSpacing: 2,
                                    marginTop: 0,
                                    textAlign: "left"
                                }}>
                                {/* Card Type */}
                                <img src={getCardIcon(card.wireTransactionVendor)} alt={card.wireTransactionVendor} align="" />

                                {/* Card Status */}
                                <span style={{ position: "inline-flex", float: "right", align: "center", "font-weight": "bold", color: `${card.status === 'enabled' ? 'lightgreen' : 'red'}` }} >
                                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}

                                    <IconButton
                                        color="primary"
                                        aria-label="add an alarm"
                                        onClick={() => toggleStatus(card)}
                                    >
                                    </IconButton>
                                </span>
                            </Typography>

                            <Box
                                sx={{
                                    display: "inline-flex",
                                    justifyContent: "left",
                                    alignItems: "left",
                                    textAlign: "left",
                                }}
                            >
                                {/* Masked Card Number */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontSize: "1.2rem",
                                        letterSpacing: 2,
                                        marginTop: 1,
                                        textAlign: "left"
                                    }}
                                >
                                    {showCardNumber[index] ? card.cardNumber : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
                                    {/* •••• •••• •••• {card.cardNumber.slice(-4)} */}
                                </Typography>
                                <IconButton
                                    onClick={() => toggleCardNumber(index)}
                                    sx={{ color: "#fff" }}
                                >
                                    {showCardNumber[index] ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            </Box>

                            {/* Valid From and Expiry */}
                            <Grid container spacing={1} sx={{ marginTop: 2 }}>
                                <Grid item size={3}>
                                    <Typography variant="body2" >Valid From</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", }}>{card.valid_from}</Typography>
                                </Grid>
                                <Grid item size={5}>
                                    <Typography variant="body2">Expiry</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", }}>{card.expiry}</Typography>
                                </Grid>

                                {/* CVV and Toggle Button */}
                                <Grid item size={4}>
                                    <Box
                                        sx={{
                                            display: "inline-flex",
                                            justifyContent: "right",
                                            alignItems: "center",
                                            textAlign: "right",
                                        }}
                                    >
                                        <Typography variant="body2" sx={{ fontWeight: "bold", }}>{"CVV : "}</Typography>
                                        <Typography variant="body1" sx={{ marginLeft: 1, fontWeight: "bold" }}>
                                            {showCVV[index] ? card.cvv : "***"}
                                        </Typography>
                                        <IconButton
                                            onClick={() => toggleCVV(index)}
                                            sx={{ color: "#fff" }}
                                        >
                                            {showCVV[index] ? (
                                                <VisibilityOffIcon />
                                            ) : (
                                                <VisibilityIcon />
                                            )}
                                        </IconButton>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "1.2rem",
                                    letterSpacing: 1,
                                    marginTop: 3,
                                    fontWeight: "bold",
                                    textAlign: "left",
                                }}
                            >
                                {usercards.nameOnTheCard}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box >
            <button onClick={() => setOpenAddCard(true)}>+ Add Credit Card</button>
            <AddCreditCard
                open={openAddCard}
                onClose={() => setOpenAddCard(false)}
                onAddCard={handleAddCard}
                existingCards={usercards.credit_card.map((card) => card.cardNumber)}
            />
        </>
    );
};

export default CreditCards;
