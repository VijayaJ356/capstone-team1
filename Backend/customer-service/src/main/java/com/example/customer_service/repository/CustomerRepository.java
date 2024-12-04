package com.example.customer_service.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.customer_service.model.Customer;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {

    Optional<Customer> findByUsername(String username);

    boolean existsByUsername(String username);
    
    boolean existsByCustomerId(Integer customerId);
    
    boolean existsByEmail(String email);

	Optional<Customer> findByCustomerId(Integer customerId);
}
