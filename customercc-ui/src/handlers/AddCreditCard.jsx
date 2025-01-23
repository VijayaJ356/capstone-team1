import { useState } from "react";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    // Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useAuth } from '../handlers/AuthContext';

// eslint-disable-next-line react/prop-types
const AddCreditCard = ({ open, onClose, onAddCard, existingCards }) => {
    const { loggedInUser } = useAuth();
    const [formData, setFormData] = useState({
        cardNumber: "",
        nameOnCard: (typeof loggedInUser.name) == 'object' ? `${loggedInUser.name.first} ${loggedInUser.name.last}` : loggedInUser.name,
        valid_from: "",
        expiry: "",
        cvv: "",
        wireTransactionVendor: "",
        status: "active",
    });

    const [errors, setErrors] = useState({});

    const wireTransactionVendors = ["VISA", "AMEX", "Rupay", "MasterCard"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        errors[name] = ""

        if (name === "cardNumber") {
            // Dynamically format the card number with dashes
            const formattedValue = value
                .replace(/\D/g, "") // Remove non-digits
                .replace(/(\d{4})(?=\d)/g, "$1-")
                .slice(0, 19);

            // Validate card number
            const plainCardNumber = formData.cardNumber.replace(/-/g, " ");

            if (plainCardNumber === "0000 0000 0000 0000") {
                errors.cardNumber = "Card number cannot be all zeros.";
                // eslint-disable-next-line react/prop-types
            } else if (existingCards.includes(plainCardNumber)) {
                errors.cardNumber = "Card number must be unique.";
            }

            setFormData({ ...formData, [name]: formattedValue });
        }
        else if (name === "cvv") {
            const formattedValue = value
                .replace(/\D/g, "")
                .slice(0, 3);

            // Validate CVV
            if (!/^\d{3}$/.test(formattedValue)) {
                errors.cvv = "CVV must be exactly 3 digits.";
            }

            setFormData({ ...formData, [name]: formattedValue });
        }
        else if (name === "valid_from" || name === "expiry") {
            const formattedValue = value
                .replace(/\D/g, "")
                .replace(/(\d{2})(?=\d)/g, "$1/")
                .slice(0, 5)

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits of the year
            const currentMonth = currentDate.getMonth() + 1;

            // Validate Expiry
            if (name === "expiry") {
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formattedValue)) {
                    errors.expiry = "Expiry must be in MM/YY format.";
                }

                const [month, year] = formattedValue.split("/").map(Number);
                if (year < currentYear || (year === currentYear && month < currentMonth)) {
                    errors.expiry = "Card has expired."
                }
            }

            // Validate Valid From
            if (name === "valid_from") {
                if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formattedValue)) {
                    errors.valid_from = "Expiry must be in MM/YY format.";
                }

                const [month, year] = formattedValue.split("/").map(Number);
                console.log(year, currentYear, month, currentMonth)
                if (year > currentYear || (year === currentYear && month > currentMonth)) {
                    errors.valid_from = "Issue date must be in the past"
                }
            }

            setFormData({ ...formData, [name]: formattedValue });

        }
        else {
            setFormData({ ...formData, [name]: value });
        }

        setErrors(errors)
    };

    const validateForm = () => {
        const newErrors = {}
        Object.keys(errors).forEach(item => {
            if (errors[item] != "") {
                newErrors[item] = errors[item]
            }
        })
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const plainCardNumber = formData.cardNumber.replace(/-/g, " ");
            onAddCard({ ...formData, cardNumber: plainCardNumber });

            console.log(formData)

            setFormData({
                cardNumber: "",
                nameOnCard: (typeof loggedInUser.name) == 'object' ? `${loggedInUser.name.first} ${loggedInUser.name.last}` : loggedInUser.name,
                valid_from: "",
                expiry: "",
                cvv: "",
                wireTransactionVendor: "",
                status: "active",
            });
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Add Credit Card</DialogTitle>
            <DialogContent>
                <Box component="form" noValidate>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Card Number"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        helperText={errors.cardNumber}
                        error={!!errors.cardNumber}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name on Card"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        disabled
                        onChange={handleInputChange}
                        helperText={errors.nameOnCard}
                        error={!!errors.nameOnCard}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Valid From (MM/YY)"
                        name="valid_from"
                        value={formData.valid_from}
                        onChange={handleInputChange}
                        helperText={errors.valid_from}
                        error={!!errors.valid_from}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Expiry (MM/YY)"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        helperText={errors.expiry}
                        error={!!errors.expiry}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="CVV"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        helperText={errors.cvv}
                        error={!!errors.cvv}
                        type="password"
                    />
                    <TextField
                        required
                        fullWidth
                        margin="normal"
                        label="Vendor"
                        name="wireTransactionVendor"
                        select
                        value={formData.wireTransactionVendor}
                        onChange={handleInputChange}
                        helperText={errors.wireTransactionVendor}
                        error={!!errors.wireTransactionVendor}
                    >
                        {wireTransactionVendors.map((wireTransactionVendor) => (
                            <MenuItem key={wireTransactionVendor} value={wireTransactionVendor}>
                                {wireTransactionVendor}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add Card
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCreditCard;
