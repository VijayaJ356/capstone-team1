
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import Grid from "@mui/material/Grid2"
import AddCreditCard from '../handlers/AddCreditCard';
import { cards } from '../data/creditcards'
import { useAuth } from '../handlers/AuthContext';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { ToggleOnOutlined, ToggleOffOutlined } from '@mui/icons-material';

import visaIcon from '../assets/icons/visa.png';
import masterCardIcon from '../assets/icons/mastercard.png';
import rupayIcon from '../assets/icons/rupay.png';
import amexIcon from '../assets/icons/american-express.png';
import defaultIcon from '../assets/icons/default.png';


const CreditCards = () => {
    const { loggedInUser } = useAuth();
    // const [cards, setCards] = useState(null)
    const [userCardslist, setUserCardsList] = useState([]);
    const [userCardsData, setUserCardsData] = useState({
        username: loggedInUser?.username || "",
        nameOnTheCard: loggedInUser ? `${loggedInUser.name.first} ${loggedInUser.name.last}` : "",
        credit_card: [],
    });
    const [openAddCard, setOpenAddCard] = useState(false);

    // const Get_Cards = async () => {
    //     await axios
    //         .get(`http://localhost/getcards`)
    //         .then((response) => {
    //             setCards(response.data)
    //             console.log(response)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         });
    // }

    // Update user cards data on component mount or loggedInUser change
    useEffect(() => {
        if (loggedInUser) {
            const userCardsCheck = cards.find(
                (item) => item.username === loggedInUser.username
            );
            if (userCardsCheck) {
                setUserCardsData(userCardsCheck);
                setUserCardsList(userCardsCheck.credit_card);
            }
        }
    }, [loggedInUser]); // Trigger only when `loggedInUser` or `cards` change

    const handleAddCard = (newCard) => {
        // Create new card data object
        const newCardData = {
            cardNumber: newCard.cardNumber,
            valid_from: newCard.valid_from,
            expiry: newCard.expiry,
            cvv: newCard.cvv,
            wireTransactionVendor: newCard.wireTransactionVendor,
            status: newCard.status,
        };

        // Update the local state for cards
        setUserCardsList((prevList) => [...prevList, newCardData]);
        // Update user's cards list
        setUserCardsData((prevData) => ({
            ...prevData,
            credit_card: [...prevData.credit_card, newCardData],
        }));

        // Find index of the logged-in user in the cards array
        const userIndex = cards.findIndex(
            (card) => card.username === loggedInUser.username
        );

        if (userIndex !== -1) {
            // If user exists, update their credit_card list
            cards[userIndex].credit_card.push(newCardData);
        } else {
            // If user does not exist, create a new user entry in cards
            cards.push({
                username: loggedInUser.username,
                nameOnTheCard: loggedInUser.name.first + loggedInUser.name.last || loggedInUser.username,
                credit_card: [newCardData],
            });
        }
    };

    const [showMaskedData, setShowMaskedData] = useState({}); // Track visibility of card numbers
    const timeoutsRef = useRef({}); // Ref to track timeouts for each card

    // Toggle CardNumber visibility for a specific card
    const toggleMaskedData = (id) => {
        // Clear any existing timeout for the card
        if (timeoutsRef.current[id]) {
            clearTimeout(timeoutsRef.current[id]);
        }

        // Toggle the visibility immediately
        setShowMaskedData((prev) => ({ ...prev, [id]: !prev[id] }));

        // Set a timeout to revert the visibility after 5 seconds
        timeoutsRef.current[id] = setTimeout(() => {
            setShowMaskedData((prev) => ({ ...prev, [id]: false }));
        }, 5000);
    };

    const [cardStatus, setCardStatus] = useState(null); // Track visibility of CardNumber for each card
    function toggleStatus(card) {
        const userCard = userCardsData.credit_card.find((item) => item.cardNumber === card.cardNumber);
        setCardStatus((prev) => ({
            ...prev,
            status: card.status,
        }))

        if (card.status == "inactive") { card.status = "active" }
        else if (card.status == "active") { card.status = "inactive" }

        console.log(userCard, cardStatus)
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
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    position: "relative",
                    gap: 2,
                    justifyContent: "center",
                    padding: 0,
                    marginTop: 5,
                }}
            >
                {userCardslist ? userCardslist.map((card, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: { xs: "100%", sm: 360 }, // 100% for mobile, fixed width for larger screens
                            height: { xs: 200, sm: 230 },
                            position: "relative",
                            color: "#fff",
                            background: `linear-gradient(135deg, ${getwireTransactionVendorStyle(card.wireTransactionVendor)})`,
                            borderRadius: 2,
                            boxShadow: 5,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <CardContent sx={{ padding: "20px" }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: ".9rem", sm: "1rem" },
                                    letterSpacing: 2,
                                    textAlign: "left",
                                }}>
                                {/* Card Type */}
                                <img src={getCardIcon(card.wireTransactionVendor)} alt={card.wireTransactionVendor} align="" />

                                {/* Card Status */}
                                <span style={{ float: "right", textAlign: "center", color: `${card.status === 'active' ? 'lightgreen' : 'red'}` }} >
                                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}

                                    <IconButton
                                        aria-label="add an alarm"
                                        onClick={() => toggleStatus(card)}
                                    >
                                        {card.status == "inactive" ?
                                            <ToggleOffOutlined />
                                            :
                                            <ToggleOnOutlined />
                                        }
                                    </IconButton>
                                </span>

                            </Typography>

                            {/* Masked Card Number */}
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.2rem" },
                                    letterSpacing: 4,
                                    marginTop: { xs: "0rem", sm: ".2rem" },
                                    textAlign: "left",
                                    width: "100%",
                                    fontWeight: "bold"
                                }}
                            >
                                {showMaskedData[index] ? card.cardNumber : `•••• •••• •••• ${card.cardNumber.slice(-4)}`}
                                {/* •••• •••• •••• {card.cardNumber.slice(-4)} */}
                                {/* <IconButton
                                    onClick={() => toggleMaskedData(index)}
                                    sx={{ color: "#fff" }}
                                >
                                    {showMaskedData[index] ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton> */}
                            </Typography>

                            {/* Valid From and Expiry */}
                            <Grid container spacing={1} sx={{ marginTop: { xs: ".5rem", sm: "1rem" }, alignItems: "center", textAlign: "center" }}>
                                <Grid item size={2}>
                                    <Typography variant="body2" sx={{ fontSize: { xs: ".8rem", sm: ".9rem" } }}>Expiry</Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: { xs: ".8rem", sm: ".9rem" } }}>{card.expiry}</Typography>
                                </Grid>

                                {/* CVV and Toggle Button */}
                                <Grid item size={2}>
                                    <Typography variant="body2" sx={{ fontSize: { xs: ".8rem", sm: ".9rem" } }}>{"CVV"}
                                    </Typography>
                                    <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: { xs: ".8rem", sm: ".9rem" } }}>
                                        {showMaskedData[index] ? card.cvv : "***"}
                                    </Typography>
                                </Grid>
                                {/* <Grid item size={1}>
                                    <IconButton
                                        onClick={() => toggleMaskedData(index)}
                                        sx={{ color: "#fff", padding: "0px", marginLeft: "5px" }}
                                    >
                                        {showMaskedData[index] ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                </Grid> */}
                            </Grid>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: { xs: "1rem", sm: "1.2rem" },
                                    letterSpacing: 1,
                                    marginTop: { xs: ".5rem", sm: "1rem" },
                                    fontWeight: "bold",
                                    textAlign: "left",
                                }}
                            >
                                {userCardsData.nameOnTheCard.first ? `${userCardsData.nameOnTheCard.first} ${userCardsData.nameOnTheCard.last}` : userCardsData.nameOnTheCard}

                                <span style={{ float: "right", textAlign: "center" }}>
                                    <IconButton
                                        onClick={() => toggleMaskedData(index)}
                                        sx={{ color: "#fff", padding: "0px", marginLeft: "5px" }}
                                    >
                                        {showMaskedData[index] ? (
                                            <VisibilityOffIcon />
                                        ) : (
                                            <VisibilityIcon />
                                        )}
                                    </IconButton>
                                </span>
                            </Typography>

                            {/* <IconButton
                                onClick={() => toggleCVV(index)}
                                sx={{ color: "#fff", padding: "0px", marginLeft: "5px" }}
                            >
                                {showCVV[index] ? (
                                    <VisibilityOffIcon />
                                ) : (
                                    <VisibilityIcon />
                                )}
                            </IconButton> */}
                        </CardContent>
                    </Card>

                ))
                    : <Typography
                        variant="h1"
                        sx={{
                            fontSize: "1.2rem",
                            letterSpacing: 1,
                            marginTop: "2rem",
                            fontWeight: "bold",
                            textAlign: "left",
                        }}
                    > No Credit Cards Data Found</Typography>
                }
            </Box >
            <Button sx={{ marginTop: 2 }} onClick={() => setOpenAddCard(true)}>+ Add Credit Card</Button>
            <AddCreditCard
                open={openAddCard}
                onClose={() => setOpenAddCard(false)}
                onAddCard={handleAddCard}
                existingCards={userCardsData.credit_card.map((card) => card.cardNumber)}
            />
        </>
    );
};

export default CreditCards;
