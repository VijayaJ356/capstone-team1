package com.example.transaction_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;


@Api(value = "Transaction Management System")
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
	
    @Autowired
    private TransactionService transactionService;

    @ApiOperation(value = "List transactions based on description")
    @GetMapping("/type/{transactionType}")
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
