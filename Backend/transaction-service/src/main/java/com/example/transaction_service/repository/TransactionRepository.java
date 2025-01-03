package com.example.transaction_service.repository;



import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.transaction_service.model.Transaction;



@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {

}
