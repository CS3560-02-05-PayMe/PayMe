package com.example.PayMe.service;

import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Transaction;
import com.example.PayMe.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;
    @Autowired
    private AccountService accountService;

    // This method retrieves all transactions from the database and sorts them in descending order by date.
    public List<Transaction> getAllTransactions(UUID userId) {
        List<Transaction> recipientList = repository.findAllByRecipient_AccountID(userId);
        List<Transaction> payerList = repository.findAllByPayer_AccountID(userId);

        recipientList.addAll(payerList);
        recipientList = recipientList.parallelStream().filter(Transaction::isSettled).collect(Collectors.toList());
        recipientList.sort(Comparator.comparing(this::parseDate));

        return recipientList;

//        return repository.findAll(Sort.by(Sort.Direction.DESC, "date"))
//                .parallelStream()
//                // filters all transactions for specified account
//                .filter(transaction -> transaction.containsUser(userId))
//                .collect(Collectors.toList());
    }

    private Date parseDate(Transaction transaction) {
        String dateString = transaction.getTransactionDate();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

        try {
            return dateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    // This method creates a new transaction in the database.
    public Transaction createTransaction(UUID payerId, UUID recipientId, Transaction transaction) {
        Account payer = accountService.retrieveAccount(payerId);
        Account recipient = accountService.retrieveAccount(recipientId);

        if (payer == null || recipient == null) return null;

        transaction.setPayer(payer);
        transaction.setRecipient(recipient);

        return repository.save(transaction);
    }

    // This method retrieves a transaction from the database by its ID.
    public Transaction getTransactionById(UUID transactionId) {
        return repository.findByTransactionID(transactionId);
    }
}