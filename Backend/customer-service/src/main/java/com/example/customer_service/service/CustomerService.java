package com.example.customer_service.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.customer_service.exception.InvalidCustomerIdException;
import com.example.customer_service.exception.InvalidEmailException;
import com.example.customer_service.model.Address;
import com.example.customer_service.model.Customer;

import com.example.customer_service.repository.CustomerRepository;
import com.example.customer_service.utils.AESUtil;

import jakarta.validation.Valid;




@Service
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    
    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    
    // Secret key for AES encryption (we need to fetch from secure storage)
    private final String SECRET_KEY = "yourSecretKey123";

    //private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerCustomer(@Valid Customer customer) throws Exception {
    	

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

        String encryptedPassword = AESUtil.encrypt(customer.getPassword(), SECRET_KEY);
        customer.setPassword(encryptedPassword);
        customerRepository.save(customer);
        
        System.out.println("Customer Object: " + customer.toString());

        

        return "Customer Registered Successfully, please validate your credit card on first login";
    }

    private boolean isValidPassword(String password) {
        // Add password validation logic (e.g. special characters, length, etc.)
        return password.length() >= 6 && password.matches(".*[!@#$%^&*].*");
    }
    
    public Customer getCustomerById(Integer customerId) throws InvalidCustomerIdException {
         // Ensure this is valid
        Optional<Customer> optionalCustomer = customerRepository.findByCustomerId(customerId);

        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get(); // Extract the Customer object
            try {
                // Decrypt the password and set it back to the customer object
                String decryptedPassword = AESUtil.decrypt(customer.getPassword(), SECRET_KEY);
                customer.setPassword(decryptedPassword);
                return customer; // Return the updated customer object
            } catch (Exception e) {
                throw new RuntimeException("Error decrypting the password: " + e.getMessage(), e);
            }
        } else {
            throw new InvalidCustomerIdException();
        }
    }
    
    public boolean updateCustomerAddress(String username, Address newAddress) {
        Optional<Customer> customerOpt = customerRepository.findByUsername(username);
        if (customerOpt.isPresent()) {
            Customer customer = customerOpt.get();
            customer.setAddress(newAddress);
            customerRepository.save(customer);
            return true;
        } else {
            return false;
        }
    }
    

    public void updateEmail(String username, String newEmail) {
        // Find customer by username
        Optional<Customer> customerOptional = customerRepository.findByUsername(username);
        if (customerOptional.isEmpty()) {
            throw new RuntimeException("Customer not found");
        }

        // Validate email format
        Customer customer = customerOptional.get();
        if (!isValidEmail(newEmail)) {
            throw new InvalidEmailException("Invalid email format");
        }

        // Update email field
        customer.setEmail(newEmail);
        
        // Save updated customer
        customerRepository.save(customer);
    }

    // Email validation method using @Email annotation logic
    private boolean isValidEmail(String email) {
        // You can also perform additional checks or regex matching here if needed
        return email != null && email.contains("@");
    }
 }
        
  
        
 
    

 



