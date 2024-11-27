package com.example.customer_registration.model;


import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;



public class Customer {

    @NotNull
    @Size(min = 6, message = "Username must be at least 6 characters")
    @jakarta.validation.constraints.Pattern(regexp = "^[A-Za-z0-9_@]+$", message = "Username can contain only alphanumeric characters, '_' or '@'")
    private String username;

    @NotNull
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotEmpty(message = "At least one credit card must be provided")
    private List<String> creditCard;

    @NotNull
    private Name name;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    
    private Date dob;

    @NotNull
    private Sex sex;

    @Email
    @NotNull(message = "Email cannot be null")
    private String email;

    // Constructor, Getters, and Setters
    public Customer(String username, String password, List<String> creditCard, Name name, Date dob, Sex sex, String email) {
        this.username = username;
        this.password = encryptPassword(password); // Encrypt password on creation
        this.creditCard = encryptCreditCards(creditCard); // Encrypt each credit card
        this.name = name;
        this.dob = dob;
        this.sex = sex;
        this.email = email;
    }

    // Custom Validations
    @AssertTrue(message = "User must be at least 18 years old")
    public boolean isAdult() {
        long ageInMillis = new Date().getTime() - dob.getTime();
        int age = (int) (ageInMillis / (1000L * 60 * 60 * 24 * 365));
        return age >= 18;
    }

    // Validates password has at least one special character
    @AssertTrue(message = "Password must contain at least one special character")
    public boolean isPasswordValid() {
        return Pattern.compile("[!@#$%^&*(),.?\":{}|<>]").matcher(password).find();
    }

    // Validates all credit card numbers using Luhn's algorithm
    @AssertTrue(message = "All credit card numbers must be valid")
    public boolean areCreditCardsValid() {
        return creditCard.stream().allMatch(this::isValidCreditCard);
    }

    // Luhn Algorithm for credit card validation
    private boolean isValidCreditCard(String cardNumber) {
        String sanitizedCard = cardNumber.replaceAll("-", "");
        int total = 0;
        boolean isEvenPosition = false;

        for (int i = sanitizedCard.length() - 1; i >= 0; i--) {
            int digit = Character.getNumericValue(sanitizedCard.charAt(i));
            if (isEvenPosition) digit *= 2;
            if (digit > 9) digit -= 9;
            total += digit;
            isEvenPosition = !isEvenPosition;
        }
        return total % 10 == 0;
    }

    // Dummy encryption methods (implement actual encryption here)
    private String encryptPassword(String password) {
        // Replace with an actual password encryption, e.g., BCrypt
        return "encrypted_" + password;
    }

    private List<String> encryptCreditCards(List<String> cards) {
        // Encrypt each card number, example stub
        return cards.stream().map(card -> "encrypted_" + card).toList();
    }

    // Name Inner Class
    public static class Name {
        @NotNull
        private String first;
        
        @NotNull
        private String last;

        public Name(String first, String last) {
            this.first = first;
            this.last = last;
        }

        // Getters and Setters
        public String getFirst() {
            return first;
        }

        public void setFirst(String first) {
            this.first = first;
        }

        public String getLast() {
            return last;
        }

        public void setLast(String last) {
            this.last = last;
        }
    }

    // Enum for Sex
    public enum Sex {
        MALE, FEMALE, TRANSGENDER
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = encryptPassword(password);
    }

    public List<String> getCreditCard() {
        return creditCard;
    }

    public void setCreditCard(List<String> creditCard) {
        this.creditCard = encryptCreditCards(creditCard);
    }

    public Name getName() {
        return name;
    }

    public void setName(Name name) {
        this.name = name;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public Sex getSex() {
        return sex;
    }

    public void setSex(Sex sex) {
        this.sex = sex;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

