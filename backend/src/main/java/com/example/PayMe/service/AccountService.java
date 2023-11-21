package com.example.PayMe.service;

import com.example.PayMe.entity.Account;
import com.example.PayMe.repository.AccountRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.UUID;
import java.util.List;

@Service
public class AccountService {
    @Autowired
    private AccountRepository repo;
    private final HashMap<String, UUID> userHash = new HashMap<>();

    @PostConstruct
    public void init() {
        synchronized (this) {
            repo.findAll()
                    .parallelStream()
                    .forEach(account -> userHash.put(account.getUsername(), account.getAccountID()));
        }
    }

    // Write get, post, delete... methods

    //------------------------------------------------
    // POST methods below
    public Account saveAccount(Account account) {
        if (userHash.containsKey(account.getUsername()) || emailExist(account.getEmailAddress())) {
            return null;
        } else {
            Account savedAccount = repo.save(account);
            userHash.put(account.getUsername(), account.getAccountID());

            return savedAccount;
        }
    }

    private boolean emailExist(String emailAddress) {
        return repo.findByEmailAddress(emailAddress).isPresent();
    }

    //------------------------------------------------
    // GET methods below
    public Account retrieveAccount(UUID uuid) {
        return repo.findByAccountID(uuid);
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
            return repo.save(existingAccount);
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
