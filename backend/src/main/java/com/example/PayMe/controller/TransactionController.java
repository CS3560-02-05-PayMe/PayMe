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
    @PostMapping("/addTransaction/{payerId}/{recipientId}")
    public ResponseEntity<Transaction> createTransaction(@PathVariable("payerId") String payerId, @PathVariable("recipientId") String recipientId, @RequestBody Transaction transaction) {
        transaction = service.createTransaction(UUID.fromString(payerId), UUID.fromString(recipientId), transaction);
        return new ResponseEntity<>(transaction, transaction == null ? HttpStatus.CONFLICT : HttpStatus.OK);
    }

    // This method retrieves all transactions from the database and sorts them in descending order by date.
    @GetMapping("/getTransactionList/{userId}")
    public ResponseEntity<List<Transaction>> getAllTransactions(@PathVariable("userId") UUID userId) {
        return new ResponseEntity<>(service.getAllTransactions(userId), HttpStatus.OK);
    }
    
    // This method retrieves a transaction from the database by its ID.
    @GetMapping("/getTransaction/{uuid}")
    public Transaction getTransactionById(@PathVariable("uuid") UUID id) {
        return service.getTransactionById(id);
    }

    @PostMapping("/updateTransaction/{uuid}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable String transactionID, @RequestBody Transaction updatedTransaction)
    {
        Transaction update = service.updateTransaction(UUID.fromString(transactionID), updatedTransaction);

        if (update != null){
            return new ResponseEntity<>(update, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

}
