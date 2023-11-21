package com.example.PayMe.controller;

import com.example.PayMe.entity.Account;
import com.example.PayMe.service.AccountService;
import org.apache.coyote.Response;
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
        // service.saveAccount will receive account object passed inputed from user
        System.out.println(account);
        account = service.saveAccount(account);
        // if account does not exist, new row is added
        // if row already exist with info input, will not save new row
        return new ResponseEntity<>(account, account == null ? HttpStatus.CONFLICT : HttpStatus.CREATED);
    }

    @GetMapping("/getAccountByUuid/{uuid}")
    public ResponseEntity<Account> getAccountById(@PathVariable("uuid") UUID uuid) {
        System.out.println("Accessing account with uuid: " + uuid.toString());
        return new ResponseEntity<>(service.retrieveAccount(uuid), HttpStatus.OK);
    }

    // ------------------------------------------------------------------------------------------
    // Functionality added on Nov 14
    // ------------------------------------------------------------------------------------------
    // get Account by username
    @GetMapping("/getAccount/{username}")
    public ResponseEntity<Account> getAccount(@PathVariable("username") String username) {
        System.out.println("Accessing account with username: " + username);

        Account account = service.retrieveAccount(username);

        // Check if the account is found
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //create new method that takes username and password
    @GetMapping("/getAccount/{username}/{password}")
    public ResponseEntity<Account> getAccountByLogin(@PathVariable("username") String username, @PathVariable("password") String password) {
        Account account = service.getAccountByLogin(username, password);

        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deleteAccount/{uuid}")
    public ResponseEntity<String> deleteAccount(@PathVariable UUID uuid) {
        service.deleteAccount(uuid);
        return new ResponseEntity<>("Account deleted successfully", HttpStatus.OK);
    }

    @DeleteMapping("/deleteAccount/{username}")
    public ResponseEntity<String> deleteAccount(@PathVariable String username) {
        service.deleteAccount(username);
        return new ResponseEntity<>("Account deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/updateAccount/{uuid}")
    public ResponseEntity<Account> updateAccount(
            @PathVariable String uuid,
            @RequestBody Account updatedAccount) {
        Account result = service.updateAccount(UUID.fromString(uuid), updatedAccount);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
