package com.example.transaction_service.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.transaction_service.model.CreditCardInfo;
import com.example.transaction_service.model.Transaction;
import com.example.transaction_service.model.TransactionInfo;
import com.example.transaction_service.repository.TransactionRepository;

import jakarta.validation.ValidationException;

@Service
public class TransactionService {
	
	@Autowired
    private TransactionRepository transactionRepository;
	public List<TransactionInfo> getTransactionsByType(String transactionType) {
		
        // List to collect matching transactions
        List<TransactionInfo> filteredTransactions = new ArrayList<>();

        // Retrieve all transactions from the database
        List<Transaction> transactions = transactionRepository.findAll();

        // Filter transactions by type
        for (Transaction transaction : transactions) {
            for (CreditCardInfo card : transaction.getCreditcards()) {
                for (TransactionInfo info : card.getTransactions()) {
                    if (info.getTransactionType().equalsIgnoreCase(transactionType)) {
                        filteredTransactions.add(info);
                    }
                }
            }
        }

        return filteredTransactions;
    }

	
    public List<TransactionInfo> findTransactionsByTypeAndCard(String transactionType, Integer creditCardId) {
        List<Transaction> transactions = transactionRepository.findAll();

        List<TransactionInfo> result = new ArrayList<>();
        for (Transaction transaction : transactions) {
            for (CreditCardInfo cardInfo : transaction.getCreditcards()) {
                if (cardInfo.getCreditCardId().equals(creditCardId)) {
                    for (TransactionInfo txn : cardInfo.getTransactions()) {
                        if (txn.getTransactionType().equalsIgnoreCase(transactionType)) {
                            result.add(txn);
                        }
                    }
                }
            }
        }
        return result;
    }
    
    public void saveTransaction(Transaction transaction) {
        // Perform validations, e.g., check if credit card IDs exist or are valid.
        if (transaction.getCreditcards() == null || transaction.getCreditcards().length == 0) {
            throw new ValidationException("Credit card information is required");
        }

        // Save the transaction to the database
        transactionRepository.save(transaction);
    }

}
