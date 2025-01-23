package com.example.customer_service.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    
    @CrossOrigin(origins = "*")
    @PostMapping("/register")
    public String registerCustomer(@Valid @RequestBody Customer customer) throws Exception {
        return customerService.registerCustomer(customer);
    }
    
    @CrossOrigin(origins = "*")
    @PutMapping("/{username}/address")
    public ResponseEntity<String> updateAddress(
            @PathVariable("username") String username,
            @RequestBody Address newAddress) {
        boolean isUpdated = customerService.updateCustomerAddress(username, newAddress);
        if (isUpdated) {
            return ResponseEntity.ok("Address updated successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
        }
    }
    


    // Endpoint to update email
    @CrossOrigin(origins = "*")
    @PutMapping("/{username}/email")
    public ResponseEntity<String> updateEmail(
            @PathVariable String username,
            @RequestBody @Validated EmailUpdateRequest emailUpdateRequest) {

        customerService.updateEmail(username, emailUpdateRequest.getNewEmail());

        return ResponseEntity.ok("Email updated successfully");
    }
    
    
    @CrossOrigin(origins = "*")
    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable Integer customerId)throws InvalidCustomerIdException {
        return customerService.getCustomerById(customerId );
    }
    
    @CrossOrigin(origins = "*")
    @PutMapping("/{username}/update-details")
    public ResponseEntity<String> updateCustomerDetails(
            @PathVariable("username") String username,
            @RequestBody @Validated CustomerDetailsUpdateRequest updateRequest) {

        boolean isAddressUpdated = false;
        boolean isEmailUpdated = false;

        try {
            // Update Address if provided
            if (updateRequest.getNewAddress() != null) {
                isAddressUpdated = customerService.updateCustomerAddress(username, updateRequest.getNewAddress());
                if (!isAddressUpdated) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found for address update");
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
    


}
