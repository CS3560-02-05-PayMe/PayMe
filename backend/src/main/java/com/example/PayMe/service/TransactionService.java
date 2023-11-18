package com.example.PayMe.service;

import com.example.PayMe.entity.Transaction;
import com.example.PayMe.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository repository;

    // This method retrieves all transactions from the database and sorts them in descending order by date.
    public List<Transaction> getAllTransactions() {
        return repository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    }

    // This method creates a new transaction in the database.
    public Transaction createTransaction(Transaction transaction) {
        return repository.save(transaction);
    }

    // This method retrieves a transaction from the database by its ID.
    public Optional<Transaction> getTransactionById(UUID transactionId) {
        return repository.findById(transactionId);
    }
}