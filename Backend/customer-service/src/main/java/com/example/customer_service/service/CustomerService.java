package com.example.customer_service.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.customer_service.exception.InvalidCustomerIdException;
import com.example.customer_service.model.Customer;

import com.example.customer_service.repository.CustomerRepository;

import jakarta.validation.Valid;



@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerCustomer(@Valid Customer customer) {
    	

        // Validate username
        if (customerRepository.existsByUsername(customer.getUsername())) {
            return "Please validate the data: username already exists";
        }
        
        // Validate Customer Id
        if (customerRepository.existsByCustomerId(customer.getCustomerId())) {
            return "Please validate the data: Customer Id already exists";
        }
        
        // Validate Email
        if (customerRepository.existsByEmail(customer.getEmail())) {
            return "Please validate the data: Email already exists";
        }

        // Validate password
        if (!isValidPassword(customer.getPassword())) {
            return "Please validate the data: Password must contain at least one special character and be at least 6 characters long";
        }

        // Validate DOB (must be 18 years or older)
        if (Period.between(customer.getDob(), LocalDate.now()).getYears() < 18) {
            return "Please validate the data: Customer must be at least 18 years old";
        }

        // Encrypt password
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        
        System.out.println("Customer Object: " + customer.toString());

        // Save customer
        customerRepository.save(customer);
        

        return "Customer Registered Successfully, please validate your credit card on first login";
    }

    private boolean isValidPassword(String password) {
        // Add password validation logic (e.g. special characters, length, etc.)
        return password.length() >= 6 && password.matches(".*[!@#$%^&*].*");
    }
    
    public Customer getCustomerById(Integer customerId) throws InvalidCustomerIdException{
    	Customer c1=null;
        Optional<Customer> c=customerRepository.findByCustomerId(customerId);
        if(c.isPresent())
        {
        	 c1=c.get();
        	 System.out.println(c1);
        }
        else
        {
        	throw new InvalidCustomerIdException();
        }
        return c1;
    }
    

 
}


