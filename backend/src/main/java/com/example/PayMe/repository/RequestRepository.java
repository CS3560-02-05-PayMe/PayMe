package com.example.PayMe.repository;

import com.example.PayMe.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

//Extending JpaRepository allows interaction with database
public interface RequestRepository extends JpaRepository<Request, UUID> {
    Request findByRequestID(UUID requestID);
    Request findByTransaction_TransactionID(UUID transactionID);

    List<Request> findAllByTransaction_Recipient_AccountID(UUID accountID);
    List<Request> findAllByTransaction_Payer_AccountID(UUID accountID);
}
