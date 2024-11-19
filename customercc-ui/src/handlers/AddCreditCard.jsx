// import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// Utility function for Luhn Algorithm
const validateCardNumber = (number) => {
    const digits = number.replace(/\D/g, "").split("").reverse();
    const checksum = digits.reduce((acc, digit, idx) => {
        digit = parseInt(digit, 10);
        if (idx % 2 !== 0) digit *= 2;
        if (digit > 9) digit -= 9;
        return acc + digit;
    }, 0);
    return checksum % 10 === 0;
};

const AddCreditCard = () => {
    const validationSchema = Yup.object({
        number: Yup.string()
            .required("Card number is required")
            .test("luhn-check", "Invalid card number", (value) => validateCardNumber(value || "")),
        name: Yup.string().required("Name on card is required"),
        cvv: Yup.string().matches(/^\d{3}$/, "CVV must be 3 digits").required("CVV is required"),
        // validFrom: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format (MM/YY)").required("Valid From is required"),
        expiry: Yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid format (MM/YY)").required("Expiry Date is required"),
    });

    const handleSubmit = (values) => {
        console.log(values); // Save the card details via an API
        alert("Card Added Successfully!");
    };

    return (
        <Formik
            initialValues={{ number: '', name: '', cvv: '', validFrom: '', expiry: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange, errors, touched }) => (
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: 'auto' }}>
                        <Typography variant="h4">Add Credit Card</Typography>
                        <TextField
                            label="Card Number"
                            name="number"
                            value={values.number}
                            onChange={handleChange}
                            error={touched.number && Boolean(errors.number)}
                            helperText={touched.number && errors.number}
                        />
                        <TextField
                            label="Name on Card"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                        />
                        <TextField
                            label="CVV"
                            name="cvv"
                            type="password"
                            value={values.cvv}
                            onChange={handleChange}
                            error={touched.cvv && Boolean(errors.cvv)}
                            helperText={touched.cvv && errors.cvv}
                        />
                        <TextField
                            label="Valid From (MM/YY)"
                            name="valid_from"
                            value={values.valid_from}
                            onChange={handleChange}
                            error={touched.valid_from && Boolean(errors.valid_from)}
                            helperText={touched.valid_from && errors.valid_from}
                        />
                        <TextField
                            label="Expiry (MM/YY)"
                            name="expiry"
                            value={values.expiry}
                            onChange={handleChange}
                            error={touched.expiry && Boolean(errors.expiry)}
                            helperText={touched.expiry && errors.expiry}
                        />
                        <Button type="submit" variant="contained">Add Card</Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default AddCreditCard;
