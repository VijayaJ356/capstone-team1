package com.example.customer_registration;


import org.springframework.boot.test.context.SpringBootTest;

import com.example.customer_registration.model.Customer;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Set;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class CustomerRegistrationApplicationTests {

    private Validator validator;

    @BeforeEach
    public void setup() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    // Test Case 1: Valid Input
    @Test
    public void testValidCustomer() throws Exception {
        Customer customer = new Customer(
                "validUser",
                "Valid@123",
                Arrays.asList("1234-5678-1234-5678"),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1990"),
                Customer.Sex.MALE,
                "valid.email@example.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.isEmpty(), "Customer should be valid with correct inputs");
    }

    // Test Case 2: Username Too Short
    @Test
    public void testUsernameTooShort() throws Exception {
        Customer customer = new Customer(
                "user",
                "Valid@123",
                Arrays.asList("1234-5678-1234-5678"),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1990"),
                Customer.Sex.MALE,
                "valid.email@example.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("Username must be at least 6 characters")));
    }

    // Test Case 3: Invalid Characters in Username
    @Test
    public void testInvalidUsernameCharacters() throws Exception {
        Customer customer = new Customer(
                "invalid$user!",
                "Valid@123",
                Arrays.asList("1234-5678-1234-5678"),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1990"),
                Customer.Sex.MALE,
                "valid.email@example.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("Username can contain only alphanumeric characters, '_' or '@'")));
    }

    // Test Case 4: Password Missing Special Character
    @Test
    public void testPasswordMissingSpecialCharacter() throws Exception {
        Customer customer = new Customer(
                "validUser",
                "Password123",
                Arrays.asList("1234-5678-1234-5678"),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1990"),
                Customer.Sex.MALE,
                "valid.email@example.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("Password must contain at least one special character")));
    }

    // Test Case 5: Missing Credit Card
    @Test
    public void testMissingCreditCard() throws Exception {
        Customer customer = new Customer(
                "validUser",
                "Valid@123",
                Arrays.asList(),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1990"),
                Customer.Sex.MALE,
                "valid.email@example.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("At least one credit card must be provided")));
    }

    // Test Case 6: Underage User
    @Test
    public void testUnderageCustomer() throws Exception {
        Customer customer = new Customer(
                "validUser",
                "Valid@123",
                Arrays.asList("1234-5678-1234-5678"),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/2010"),
                Customer.Sex.MALE,
                "valid.email@example.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("User must be at least 18 years old")));
    }

    // Test Case 7: Invalid Credit Card Number
    @Test
    public void testInvalidCreditCardNumber() throws Exception {
        Customer customer = new Customer(
                "validUser",
                "Valid@123",
                Arrays.asList("1234-5678-1234-5678", "0000-0000-0000-0000"),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1990"),
                Customer.Sex.MALE,
                "valid.email@example.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().equals("All credit card numbers must be valid")));
    }

    // Test Case 8: Invalid Email Format
    @Test
    public void testInvalidEmailFormat() throws Exception {
        Customer customer = new Customer(
                "validUser",
                "Valid@123",
                Arrays.asList("1234-5678-1234-5678"),
                new Customer.Name("John", "Doe"),
                new SimpleDateFormat("dd/MM/yyyy").parse("01/01/1990"),
                Customer.Sex.MALE,
                "invalidEmail.com"
        );

        Set<ConstraintViolation<Customer>> violations = validator.validate(customer);
        assertTrue(violations.stream().anyMatch(v -> v.getMessage().contains("must be a well-formed email address")));
    }
}

