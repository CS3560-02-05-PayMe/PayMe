package com.example.PayMe.controller;

import com.example.PayMe.entity.Account;
import com.example.PayMe.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class AccountController {
    // controller will talk to service
    // therefore, we need to inject service in this class
    // by using @Autowired
    @Autowired
    private AccountService service;

    // Now Write all the REST endpoints,
    // which are presents in service, give the url

    // ------------------------------------------------
    // POST

//    ResponseEntity returns the class in a JSON object to frontend
//    This makes it easier for frontend to parse and read data
    @PostMapping("/addAccount")
    public ResponseEntity<Account> addAccount(@RequestBody Account account) {
        System.out.println("Added account :: " + account.toString());
        return new ResponseEntity<>(service.saveAccount(account), HttpStatus.CREATED);
    }

    @GetMapping("/getAccount/{uuid}")
    public ResponseEntity<Account> getAccount(@PathVariable("uuid") UUID uuid) {
        System.out.println("Accessing account with uuid: " + uuid.toString());
        return new ResponseEntity<>(service.retrieveAccount(uuid), HttpStatus.OK);
    }
}
