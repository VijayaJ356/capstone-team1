package com.example.transaction_service.repository;



import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.transaction_service.model.Transaction;



@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    // Query to find transactions by username and transactionType
    @Query("{ 'username': ?0, 'creditcards.transactions.transactionType': ?1 }")
    List<Transaction> findTransactionsByUsernameAndType(String username, String transactionType);

}
