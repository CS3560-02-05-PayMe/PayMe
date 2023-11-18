package com.example.PayMe.controller;

import com.example.PayMe.service.TransactionService;
import com.example.PayMe.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService TransactionService;

    // This method retrieves all transactions from the database and sorts them in descending order by date.
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return TransactionService.getAllTransactions();
    }
    
    // This method retrieves a transaction from the database by its ID.
    @GetMapping("/{id}")
    public Transaction getTransactionById(@PathVariable UUID id) {
        return TransactionService.getTransactionById(id).orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + id));
    }

    // This method handles POST requests to create a new transaction in the database.
    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return TransactionService.createTransaction(transaction);
    }
}
