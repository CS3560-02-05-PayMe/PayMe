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
        return repo.saveAndFlush(account);
    }

//    public List<Account> listAll() {
//        return (List<Account>) repo.findAll();
//    }

    //------------------------------------------------
    // GET methods below
    public Account retrieveAccount(UUID uuid) {
        return repo.getReferenceById(uuid);
    }

    public Account retrieveAccount(String username) {
        return retrieveAccount(userHash.get(username));
    }

    //------------------------------------------------
    // DELETE methods below
    public void deleteAccount(UUID uuid) {
        repo.deleteById(uuid);
    }

    public void deleteAccount(String username) {
        deleteAccount(userHash.get(username));
    }

    public Account updateAccount(UUID uuid, Account updatedAccount) {
        Account existingAccount = retrieveAccount(uuid);

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
            return saveAccount(existingAccount);
        }

        // If the account with the specified UUID doesn't exist, return null or throw an exception
        return null;
    }

    //
    //  functionalities added on Nov 15
    //
    // In your AccountService class
    public Account getAccountByLogin(String username, String password) {
        // Retrieve the account based on the provided username
        UUID accountID = userHash.get(username);
        Account account = repo.getReferenceById(accountID);

        // Check if the account is found and the password matches
        if (account.getPassword().equals(password)) {
            return account;
        } else {
            // If the account is not found or the password doesn't match, return null
            return null;
        }
    }
}
