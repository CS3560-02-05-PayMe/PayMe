package com.example.PayMe.service;

import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Payment;
import com.example.PayMe.entity.Transaction;
import com.example.PayMe.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository repo;
    @Autowired
    private TransactionService transactionService;

    public Payment savePayment(UUID transactionId, Payment payment) {
        Transaction transaction = transactionService.getTransactionById(transactionId);

        if (transaction == null) return null;

        payment.setTransaction(transaction);

        return repo.save(payment);
    }

    public Payment retrievePayment(UUID uuid) {
        return repo.getReferenceById(uuid);
    }

    public void deletePayment(UUID uuid) {
        repo.deleteById(uuid);
    }

    public Payment updatePayment(UUID uuid, Payment updatedPayment) {
        Payment existingPayment = repo.findById(uuid).orElse(null);

        if (existingPayment != null) {
//            existingPayment.setPaymentType(updatedPayment.getPaymentType());
            existingPayment.setPaymentAmount(updatedPayment.getPaymentAmount());
//            existingPayment.setSettled(updatedPayment.isSettled());
//            existingPayment.setRecurring(updatedPayment.isRecurring());

            return repo.save(existingPayment);
        } else {
            return null;
        }
    }

}
