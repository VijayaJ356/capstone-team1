package com.example.customer_registration.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.customer_registration.model.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String> {
    // Custom query method
    Customer findByName(String first);
}
