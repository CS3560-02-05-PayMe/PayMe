package com.example.PayMe.service;

import com.example.PayMe.entity.CreditCardInfo;
import com.example.PayMe.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CreditCardService {
    @Autowired
    private CreditCardRepository repo;

    // -----------------------------------------------------------------
    // methods added on Nov 14 - Eugene
    // -----------------------------------------------------------------
    public CreditCardInfo saveCreditCardInfo(CreditCardInfo creditcard) {
        return (CreditCardInfo) repo.save(creditcard);
    }

    // retrieve credit card info
    public CreditCardInfo retrieveCreditCardInfo(String cardNumber) {
        return (CreditCardInfo) repo.getReferenceById(cardNumber);
    }

    // list all the credit card
    public List<CreditCardInfo> listAll() {
        return (List<CreditCardInfo>) repo.findAll();
    }

    public void deleteCreditCardInfo(String cardNumber) {
        repo.deleteById(cardNumber);
    }
}
