package com.example.PayMe.controller;

import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.CreditCardInfo;
import com.example.PayMe.service.CreditCardService;
import com.mysql.cj.x.protobuf.Mysqlx;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CreditCardController {

    @Autowired private CreditCardService service;

    @PostMapping("/addCreditCard")
    public ResponseEntity<CreditCardInfo> addCreditCard(@RequestBody CreditCardInfo creditcard)
    {
        System.out.println("New credit card added :" + creditcard.toString());
        return new ResponseEntity<>(service.saveCreditCardInfo(creditcard), HttpStatus.CREATED);
    }

    @GetMapping("/getCreditCard/{cardNumber}")
    public ResponseEntity<CreditCardInfo> getCreditCardInfo(@PathVariable("cardNumber") String cardNumber)
    {
        System.out.println("Accessing creditCardInfo with cardNumber" + cardNumber);
        return new ResponseEntity<>(service.retrieveCreditCardInfo(cardNumber), HttpStatus.OK);
    }

    @GetMapping("/getCreditCards")
    public List<CreditCardInfo> getCreditCardInfoList()
    {
        return service.listAll();
    }

    @DeleteMapping("/deleteCreditCardInfo/{cardNumber}")
    public ResponseEntity<String> deleteCreditCardInfo(@PathVariable("cardNumber") String cardNumber)
    {
        service.deleteCreditCardInfo(cardNumber);
        return new ResponseEntity<>("Credit Card Info deleted", HttpStatus.OK);
    }



}
