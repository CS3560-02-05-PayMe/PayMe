package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Account")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "account_id", updatable = false, nullable = false)
    private UUID accountID;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email_address")
    private String emailAddress;

    // Login Credentials
    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "balance")
    private double balance;

    public UUID getAccountID() {
        return accountID;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public double getBalance() {
        return balance;
    }
}
