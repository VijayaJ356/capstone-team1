package com.example.transaction_service.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import java.util.Collections;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import java.util.ArrayList;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.example.transaction_service.model.CreditCardInfo;
import com.example.transaction_service.model.Transaction;
import com.example.transaction_service.model.TransactionInfo;
import com.example.transaction_service.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
public class TransactionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionController controller;

    @MockBean
    private TransactionService transactionService;

    @Autowired
    private ObjectMapper objectMapper;

    private Transaction testTransaction;
    private TransactionInfo testTransactionInfo;
    private CreditCardInfo testCreditCardInfo;

    @BeforeEach
    void setUp() {
        // Create test TransactionInfo
        testTransactionInfo = new TransactionInfo(123456L, "2024-01-19", "10:30:00", "CR", 100.00);

        // Create test CreditCardInfo
        TransactionInfo[] transactions = {testTransactionInfo};
        testCreditCardInfo = new CreditCardInfo(12345, transactions);

        // Create test Transaction
        CreditCardInfo[] creditCards = {testCreditCardInfo};
        testTransaction = new Transaction(null, "johndoe", creditCards);
    }

    @Test
    void getTransactionsByType_Success() throws Exception {
        TransactionInfo transaction = new TransactionInfo(123456L, "2024-01-19", "10:30:00", "CR", 100.00);
        when(transactionService.getTransactionsByType("CR"))
                .thenReturn(Arrays.asList(transaction));

        mockMvc.perform(get("/api/transaction/CR"))
                .andDo(print()) // HERE
                .andExpect(status().isOk());
    }

    @Test
    void getTransactionsByType_EmptyResult() throws Exception {
        when(transactionService.getTransactionsByType("DB"))
                .thenReturn(Collections.emptyList());

        mockMvc.perform(get("/api/transaction/DB"))
                .andDo(print()) // AND HERE
                .andExpect(status().isOk());
    }

    @Test
    void getTransactionsByTypeAndCard_Success() throws Exception {
        when(transactionService.findTransactionsByTypeAndCard("CR", 12345))
                .thenReturn(Arrays.asList(testTransactionInfo));

        mockMvc.perform(get("/api/transaction")
                        .param("transactionType", "CR")
                        .param("creditCardId", "12345"))
                .andExpect(status().isOk());
    }

    @Test
    void getTransactionsByTypeAndCard_NoTransactions() throws Exception {
        when(transactionService.findTransactionsByTypeAndCard("DB", 12345)).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/transaction")
                        .param("transactionType", "DB")
                        .param("creditCardId", "12345"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$").isEmpty());
    }

//    @Test
//    void addTransaction_Success() throws Exception {
//        when(transactionService.saveTransaction(any(Transaction.class)))
//                .thenReturn("Transaction saved successfully");
//
//        mockMvc.perform(post("/api/transaction/add")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(testTransaction)))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Transaction saved successfully"));
//    }

//    @Test
//    void getTransactionsByUsernameAndType_WhenNoTransactions_ReturnsNotFound() throws Exception {
//        when(transactionService.getTransactionsByUsernameAndType("user1", "DEBIT"))
//                .thenReturn(new ArrayList<>());
//
//        mockMvc.perform(get("/api/transaction/user1/DEBIT"))
//                .andDo(print()) // AND HERE
//                .andExpect(status().isNotFound());
//    }

    @Test
    void getTransactionsByUsernameAndType_WhenTransactionsExist_ReturnsOk() throws Exception {
        List<TransactionInfo> transactions = Arrays.asList(testTransactionInfo);
        when(transactionService.getTransactionsByUsernameAndType("user1", "DEBIT"))
                .thenReturn(transactions);

        mockMvc.perform(get("/api/transaction/user1/DEBIT"))
                .andExpect(status().isOk());
    }
}