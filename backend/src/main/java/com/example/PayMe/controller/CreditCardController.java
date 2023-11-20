package com.example.PayMe.controller;

import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Address;
import com.example.PayMe.entity.CreditCardInfo;
import com.example.PayMe.service.AccountService;
import com.example.PayMe.service.CreditCardService;
import com.mysql.cj.x.protobuf.Mysqlx;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class CreditCardController {

    @Autowired
    private CreditCardService service;
    @Autowired
    private AccountService accountService;

    @PostMapping("/addCreditCard/{userId}")
    public ResponseEntity<CreditCardInfo> addCreditCard(@PathVariable("userId") String userId, @RequestBody CreditCardInfo creditCard) {
        System.out.println("New credit card added :" + creditCard.toString());
        Account account = accountService.retrieveAccount(UUID.fromString(userId));
        creditCard.setAccount(account);
        return new ResponseEntity<>(service.saveCreditCardInfo(creditCard), HttpStatus.CREATED);
    }

    @PostMapping("/updateCreditCardList/{userId}")
    public ResponseEntity<List<CreditCardInfo>> updateCreditCardList(@PathVariable("userId") String userId, @RequestBody List<CreditCardInfo> updatedCardList) {
        System.out.println(updatedCardList);
        List<CreditCardInfo> result = service.updateCreditCardList(UUID.fromString(userId), updatedCardList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/getCreditCard/{userId}/{cardNumber}")
    public ResponseEntity<CreditCardInfo> getCreditCardInfo(@PathVariable("userId") String userId, @PathVariable("cardNumber") String cardNumber) {
        System.out.println("Accessing creditCardInfo with cardNumber" + cardNumber);
        return new ResponseEntity<>(service.retrieveCreditCardInfo(UUID.fromString(userId), cardNumber), HttpStatus.OK);
    }

    @GetMapping("/getCreditCardList/{userId}")
    public ResponseEntity<List<CreditCardInfo>> getCreditCardInfoList(@PathVariable("userId") String userId) {
        System.out.println("Accessing creditCardList with uuid " + userId);
        return new ResponseEntity<>(service.retrieveCreditCards(UUID.fromString(userId)), HttpStatus.OK);
    }

    @DeleteMapping("/deleteCreditCardInfo/{cardNumber}")
    public ResponseEntity<String> deleteCreditCardInfo(@PathVariable("cardNumber") String cardNumber) {
        service.deleteCreditCardInfo(cardNumber);
        return new ResponseEntity<>("Credit Card Info deleted", HttpStatus.OK);
    }
}
