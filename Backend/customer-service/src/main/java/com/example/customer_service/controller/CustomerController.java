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
    @PutMapping("/{username}/email")
    public ResponseEntity<String> updateEmail(
            @PathVariable String username,
            @RequestBody @Validated EmailUpdateRequest emailUpdateRequest) {

        customerService.updateEmail(username, emailUpdateRequest.getNewEmail());

        return ResponseEntity.ok("Email updated successfully");
    }

    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable Integer customerId)throws InvalidCustomerIdException {
        return customerService.getCustomerById(customerId );
    }
    


}
