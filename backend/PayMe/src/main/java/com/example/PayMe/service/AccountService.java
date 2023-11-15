package com.example.PayMe.service;

import com.example.PayMe.entity.Account;
import com.example.PayMe.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;
import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository repo;
    private HashMap<String, UUID> userHash = new HashMap<>();

    // Write get, post, delete... methods

    //------------------------------------------------
    // POST methods below
    public Account saveAccount(Account account){

        userHash.put(account.getUsername(), account.getAccountID());
        return repo.save(account);
    }

    public List<Account> listAll() {
        return (List<Account>) repo.findAll();
    }

    //------------------------------------------------
    // GET methods below
    public Account retrieveAccount(UUID uuid) {
        return repo.getReferenceById(uuid);
    }

    public Account retrieveAccount(String username) {return repo.getReferenceById(userHash.get(username));}


    //------------------------------------------------
    // DELETE methods below
    public void deleteAccount(UUID uuid) {
        repo.deleteById(uuid);
    }

    public Account updateAccount(UUID uuid, Account updatedAccount) {
        Account existingAccount = repo.findById(uuid).orElse(null);

        if (existingAccount != null) {
            // Update the existing account with the data from updatedAccount
            existingAccount.setFirstName(updatedAccount.getFirstName());
            existingAccount.setLastName(updatedAccount.getLastName());
            existingAccount.setBalance(updatedAccount.getBalance());
            existingAccount.setPhoneNumber(updatedAccount.getPhoneNumber());
            existingAccount.setEmailAddress(updatedAccount.getEmailAddress());
            existingAccount.setUsername(updatedAccount.getUsername());
            existingAccount.setPassword(updatedAccount.getPassword());

            // Save the updated account
            return repo.save(existingAccount);
        }

        // If the account with the specified UUID doesn't exist, return null or throw an exception
        return null;
    }


    //------------------------------------------------
    // UPDATE methods below
}
