package com.example.transaction_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.transaction_service.model.Transaction;
import com.example.transaction_service.model.TransactionInfo;
import com.example.transaction_service.service.TransactionService;




@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
	
    @Autowired
    private TransactionService transactionService;
    
    
    @GetMapping("/{username}/{transactionType}")
    public ResponseEntity<List<TransactionInfo>> getTransactionsByUsernameAndType(
            @PathVariable String username,
            @PathVariable String transactionType) {
        List<TransactionInfo> transactions = transactionService.getTransactionsByUsernameAndType(username, transactionType);
        if (transactions.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(transactions);
        }
        return ResponseEntity.ok(transactions);
    }

  
    @GetMapping("/{transactionType}")
    public ResponseEntity<List<TransactionInfo>> getTransactionsByType(@PathVariable String transactionType) {
        List<TransactionInfo> transactions = transactionService.getTransactionsByType(transactionType);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping
    public List<TransactionInfo> getTransactionsByTypeAndCard(
            @RequestParam String transactionType,
            @RequestParam Integer creditCardId) {

        return transactionService.findTransactionsByTypeAndCard(transactionType, creditCardId);
    }

    
    @PostMapping("/add")
    public ResponseEntity<String> addTransaction(@RequestBody Transaction transaction) {
        transactionService.saveTransaction(transaction);
        return ResponseEntity.ok("Transaction saved successfully");
    }

}
