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
        System.out.println("Added account :: " + account.toString());
        return new ResponseEntity<>(service.saveAccount(account), HttpStatus.CREATED);
    }

    @GetMapping("/getAccount/{uuid}")
    public ResponseEntity<Account> getAccount(@PathVariable("uuid") UUID uuid) {
        System.out.println("Accessing account with uuid: " + uuid.toString());
        return new ResponseEntity<>(service.retrieveAccount(uuid), HttpStatus.OK);
    }

    @DeleteMapping("/deleteAccount/{uuid}")
    public ResponseEntity<String> deleteAccount(@PathVariable UUID uuid) {
        service.deleteAccount(uuid);
        return new ResponseEntity<>("Account deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/updateAccount/{uuid}")
    public ResponseEntity<Account> updateAccount(
            @PathVariable UUID uuid,
            @RequestBody Account updatedAccount) {
        Account result = service.updateAccount(uuid, updatedAccount);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // ------------------------------------------------------------------------------------------
    // Functionality added on Nov 14
    // ------------------------------------------------------------------------------------------


    // get Account by first name
    @GetMapping("/getAccount/{username}")
    public ResponseEntity<Account> getAccountByUsername(@PathVariable("username") String username) {
        System.out.println("Accessing account with username: " + username.toString());
        //return new ResponseEntity<>(service.retrieveAccount(firstName), HttpStatus.OK);
        Account account = service.getAccountByUsername(username);

        // check if inputed username is valid on system
        if (account != null)
        {
            // if user exist
            return new ResponseEntity<>(account, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // get account by email
    @GetMapping("/getAccount/{emailAddress}")
    public ResponseEntity<Account> getAccountByEmailAddress(@PathVariable("emailAddress") String emailAddress) {
        System.out.println("Accessing account with uuid: " + emailAddress.toString());
        return new ResponseEntity<>(service.retrieveAccount(UUID.fromString(emailAddress)), HttpStatus.OK);
    }



    // create new method that takes username and password
//    @GetMapping("/getAccount/{username}/{password}")
//    public ResponseEntity<Account> getAccountByLogin(@PathVariable("username") String username, @PathVariable("password") String password)
//    {
            // get the account corresponding username, and check if
            // input password matches,
            // return account if match, return null if not match
//
//    }

}
