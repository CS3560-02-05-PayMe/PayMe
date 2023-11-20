package com.example.PayMe.controller;

import com.example.PayMe.service.TransactionService;
import com.example.PayMe.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class TransactionController {

    @Autowired
    private TransactionService service;

    // This method handles POST requests to create a new transaction in the database.
    @PostMapping("/addTransaction")
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return service.createTransaction(transaction);
    }

    // This method retrieves all transactions from the database and sorts them in descending order by date.
    @GetMapping("/getTransactions/{userId}")
    public ResponseEntity<List<Transaction>> getAllTransactions(@PathVariable("userId") UUID userId) {
        return new ResponseEntity<>(service.getAllTransactions(userId), HttpStatus.OK);
    }
    
    // This method retrieves a transaction from the database by its ID.
    @GetMapping("/getTransaction/{uuid}")
    public Transaction getTransactionById(@PathVariable("uuid") UUID id) {
        return service.getTransactionById(id).orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id " + id));
    }
}
