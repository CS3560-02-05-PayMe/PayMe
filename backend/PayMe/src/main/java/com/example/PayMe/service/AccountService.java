package com.example.PayMe.service;

import com.example.PayMe.entity.Account;
import com.example.PayMe.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AccountService {
    @Autowired
    private AccountRepository repo;

    // Write get, post, delete... methods

    //------------------------------------------------
    // POST methods below
    public Account saveAccount(Account account){
        return repo.save(account);
    }


    //------------------------------------------------
    // GET methods below
    public Account retrieveAccount(UUID uuid) {
        return repo.getReferenceById(uuid);
    }


    //------------------------------------------------
    // DELETE methods below




    //------------------------------------------------
    // UPDATE methods below
}
