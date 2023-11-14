package com.example.PayMe.service;

import com.example.PayMe.entity.Transaction;
import com.example.PayMe.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository repository;


    // Write get, post, delete, update methods

    //-----------------------------------------
    // Post methods

    public Transaction saveTransaction(Transaction transaction)
    {
//        return transaction.save(transaction);
        return null;
    }



}
