package com.example.transaction_service.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.transaction_service.exception.TransactionNotFoundException;
import com.example.transaction_service.model.CreditCardInfo;
import com.example.transaction_service.model.Transaction;
import com.example.transaction_service.model.TransactionInfo;
import com.example.transaction_service.repository.TransactionRepository;

import jakarta.validation.ValidationException;

@Service
public class TransactionService {
	
	@Autowired
    private TransactionRepository transactionRepository;
	

    public List<TransactionInfo> getTransactionsByUsernameAndType(String username, String transactionType) {
    	List<Transaction> transactions = transactionRepository.findTransactionsByUsernameAndType(username, transactionType);
    	if (transactions.isEmpty()) {
    		throw new TransactionNotFoundException("No transactions found for username: " + username + " and transaction type: " + transactionType);
        }
        List<TransactionInfo> filteredTransactions = new ArrayList<>();
        for (Transaction transaction : transactions) {
            if (transaction.getUsername().equalsIgnoreCase(username)) {
                for (CreditCardInfo card : transaction.getCreditcards()) {
                    for (TransactionInfo info : card.getTransactions()) {
                        if (info.getTransactionType().equalsIgnoreCase(transactionType)) {
                            filteredTransactions.add(info);
                        }
                    }
                }
            }
        }
        return filteredTransactions;
    }
	
	public List<TransactionInfo> getTransactionsByType(String transactionType) {
		
        // List to collect matching transactions
        List<TransactionInfo> filteredTransactions = new ArrayList<>();

        // Retrieve all transactions from the database
        List<Transaction> transactions = transactionRepository.findAll();
        if (transactions.isEmpty()) {
    		throw new TransactionNotFoundException("No transactions found");
        }

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
        if (transactions.isEmpty()) {
    		throw new TransactionNotFoundException("No transactions found for transactionType: " + transactionType + " and creditCardId: " + creditCardId);
        }
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
