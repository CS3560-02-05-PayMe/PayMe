package com.example.PayMe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Account")
public class Account {
    @Id
    @GeneratedValue
    private final UUID userID;
    private int phoneNumber;
    private String firstName;
    private String lastName;
    private String emailAddress;

    // Login Credentials
    private String loginID;


    public Account(UUID userID) {
        this.userID = userID;
    }
}
