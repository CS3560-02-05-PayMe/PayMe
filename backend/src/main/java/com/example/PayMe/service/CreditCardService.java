package com.example.PayMe.service;

import com.example.PayMe.entity.Account;
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
    @Autowired
    private AccountService accountService;

    // -----------------------------------------------------------------
    // methods added on Nov 14 - Eugene
    // -----------------------------------------------------------------
    public CreditCardInfo saveCreditCardInfo(CreditCardInfo creditcard) {
        return repo.saveAndFlush(creditcard);
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

    // get all credit cards associated with user
    public List<CreditCardInfo> retrieveCreditCards(UUID userID) {
        return repo.findAllByAccount_AccountID(userID);
    }

    public void deleteCreditCardInfo(String cardNumber) {
        repo.deleteById(cardNumber);
    }

    public List<CreditCardInfo> updateCreditCardList(UUID userId, List<CreditCardInfo> updatedCardList) {
        Account account = accountService.retrieveAccount(userId);
        List<CreditCardInfo> existingList = retrieveCreditCards(userId);

        // update existing list with new address list
        existingList.clear();
        updatedCardList.parallelStream().forEach(creditCardInfo -> {
            creditCardInfo.setAccount(account);
            existingList.add(creditCardInfo);
        });

        // save updated list
        repo.saveAll(existingList);
        return existingList;
    }
}
