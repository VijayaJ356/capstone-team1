package com.example.customer_service.controller;

import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.customer_service.exception.InvalidCustomerIdException;
import com.example.customer_service.model.Customer;
import com.example.customer_service.service.CustomerService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @PostMapping("/register")
    public String registerCustomer(@Valid @RequestBody Customer customer) {
        return customerService.registerCustomer(customer);
    }
    @Operation(summary = "Fetches Manage tier access details")
    @GetMapping("/{customerId}")
    public Customer getCustomer(@PathVariable Integer customerId)throws InvalidCustomerIdException {
        return customerService.getCustomerById(customerId );
    }

}
