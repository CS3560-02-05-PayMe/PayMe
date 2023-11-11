package com.example.PayMe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Transaction")
public class Transaction {
    // Attributes
    @Id
    @GeneratedValue
    private final UUID transactionID;
    private final Date transactionDate; // only digits
    private final double transactionAmount;
    private final String transactionType;
    private boolean isRecurring;


    public Transaction(UUID transactionID, Date transactionDate, double transactionAmount, String transactionType) {
        this.transactionID = transactionID;
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.transactionType = transactionType;
    }


}
