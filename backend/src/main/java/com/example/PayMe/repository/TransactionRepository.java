package com.example.PayMe.repository;

import com.example.PayMe.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    Transaction findByTransactionID(UUID transactionID);

    List<Transaction> findAllByRecipient_AccountID(UUID accountID);
    List<Transaction> findAllByPayer_AccountID(UUID accountID);
}
