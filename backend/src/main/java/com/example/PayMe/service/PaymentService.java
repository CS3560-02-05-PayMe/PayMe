package com.example.PayMe.service;

import com.example.PayMe.entity.Payment;
import com.example.PayMe.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository repo;

    //Save Payment to database
    public Payment savePayment(Payment payment){  return repo.save(payment);  }

    //Retrieve Payment from database
    public Payment retrievePayment(UUID uuid){  return repo.getReferenceById(uuid);  }

    //Delete Payment from database
    public void deletePayment(UUID uuid){  repo.deleteById(uuid);  }

    //Update Payment
    //Note that we can't simply set existingPayment to updatedPayment as we don't want to overwrite everything
    public Payment updatePayment(UUID uuid, Payment updatedPayment){
        Payment existingPayment = repo.findById(uuid).orElse(null);

        if (existingPayment != null){
            existingPayment.setPaymentAmount(updatedPayment.getPaymentAmount());
            existingPayment.setPaymentDate(updatedPayment.getPaymentDate());
            existingPayment.setMessage(updatedPayment.getMessage());

            return repo.save(existingPayment);
        }
        else{
            return null;    //Return null if payment id doesn't return
        }
    }

}
