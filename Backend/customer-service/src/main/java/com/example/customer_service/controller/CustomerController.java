package com.example.customer_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.customer_service.dto.CustomerDetailsUpdateRequest;
import com.example.customer_service.dto.EmailUpdateRequest;
import com.example.customer_service.exception.InvalidCustomerIdException;
import com.example.customer_service.model.Address;
import com.example.customer_service.model.Customer;
import com.example.customer_service.service.CustomerService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Register a new customer
    @PostMapping("/register")
    public ResponseEntity<String> registerCustomer(@Valid @RequestBody Customer customer) {
        try {
            String message = customerService.registerCustomer(customer);
            return ResponseEntity.status(HttpStatus.CREATED).body(message);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error during registration: " + e.getMessage());
        }
    }

    // Get customer by ID
    @GetMapping("/{customerId}")
    public ResponseEntity<?> getCustomer(@PathVariable Integer customerId) {
        try {
            Customer customer = customerService.getCustomerById(customerId);
            return ResponseEntity.ok(customer);
        } catch (InvalidCustomerIdException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Customer with ID " + customerId + " not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching customer details: " + e.getMessage());
        }
    }

    // Update customer address
    @PutMapping("/{username}/address")
    public ResponseEntity<String> updateAddress(
            @PathVariable("username") String username,
            @RequestBody @Valid Address newAddress) {
        try {
            boolean isUpdated = customerService.updateCustomerAddress(username, newAddress);
            if (isUpdated) {
                return ResponseEntity.ok("Address updated successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating address: " + e.getMessage());
        }
    }

    // Update customer email
    @PutMapping("/{username}/email")
    public ResponseEntity<String> updateEmail(
            @PathVariable("username") String username,
            @RequestBody @Validated EmailUpdateRequest emailUpdateRequest) {
        try {
            customerService.updateEmail(username, emailUpdateRequest.getNewEmail());
            return ResponseEntity.ok("Email updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating email: " + e.getMessage());
        }
    }

    // Update customer details (email and/or address)
    @PutMapping("/{username}/update-details")
    public ResponseEntity<String> updateCustomerDetails(
            @PathVariable("username") String username,
            @RequestBody @Validated CustomerDetailsUpdateRequest updateRequest) {
        try {
            boolean isAddressUpdated = false;
            boolean isEmailUpdated = false;

            // Update Address if provided
            if (updateRequest.getNewAddress() != null) {
                isAddressUpdated = customerService.updateCustomerAddress(username, updateRequest.getNewAddress());
                if (!isAddressUpdated) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body("Customer not found for address update.");
                }
            }

            // Update Email if provided
            if (updateRequest.getNewEmail() != null) {
                customerService.updateEmail(username, updateRequest.getNewEmail());
                isEmailUpdated = true;
            }

            // Build response message
            StringBuilder responseMessage = new StringBuilder("Update results: ");
            if (isAddressUpdated) responseMessage.append("Address updated successfully. ");
            if (isEmailUpdated) responseMessage.append("Email updated successfully. ");
            if (!isAddressUpdated && !isEmailUpdated) responseMessage.append("No updates made.");

            return ResponseEntity.ok(responseMessage.toString());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating details: " + e.getMessage());
        }
    }
}
