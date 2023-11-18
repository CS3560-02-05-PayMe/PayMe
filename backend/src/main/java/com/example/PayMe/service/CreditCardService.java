package com.example.PayMe.service;

import com.example.PayMe.entity.Address;
import com.example.PayMe.entity.CreditCardInfo;
import com.example.PayMe.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CreditCardService {
    @Autowired
    private CreditCardRepository repo;

    // -----------------------------------------------------------------
    // methods added on Nov 14 - Eugene
    // -----------------------------------------------------------------
    public CreditCardInfo saveCreditCardInfo(CreditCardInfo creditcard) {
        return repo.save(creditcard);
    }

    // get card associated with user
    public CreditCardInfo retrieveCreditCardInfo(UUID userID, String cardNumber) {
        return retrieveCreditCards(userID)
                .parallelStream()
                // filter address associated with specified uuid
                .filter(card -> card.getCardNumber().equals(cardNumber))
                .findFirst()
                .orElse(null);
    }

    // list all the credit cards associated with user
    public List<CreditCardInfo> retrieveCreditCards(UUID userID) {
        // list all cards
        return repo.findAll()
                .parallelStream()
                // filter cards associated with specified uuid/account
                .filter(card -> card.getAccount().getAccountID().equals(userID))
                .collect(Collectors.toList());
    }

    public void deleteCreditCardInfo(String cardNumber) {
        repo.deleteById(cardNumber);
    }
}
