package com.example.PayMe.controller;

import com.example.PayMe.entity.Account;
import com.example.PayMe.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    @PostMapping("/addAccount")
    public Account addAccount(@RequestBody Account account){
        return service.saveAccount(account);
    }

}
