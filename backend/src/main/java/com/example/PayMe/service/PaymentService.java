package com.example.PayMe.service;

import com.example.PayMe.entity.Payment;
import com.example.PayMe.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

public class PaymentService {
    @Autowired
    private PaymentRepository repo;

    public Payment savePayment(Payment payment) {
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
            existingPayment.setPaymentDate(updatedPayment.getPaymentDate());
            existingPayment.setPaymentType(updatedPayment.getPaymentType());
            existingPayment.setPaymentAmount(updatedPayment.getPaymentAmount());
            existingPayment.setSettled(updatedPayment.isSettled());
            existingPayment.setRecurring(updatedPayment.isRecurring());

            return repo.save(existingPayment);
        } else {
            return null;
        }
    }

}
