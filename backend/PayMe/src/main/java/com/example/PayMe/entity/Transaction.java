package com.example.PayMe.entity;

import jakarta.persistence.Entity;
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
    private final UUID transactionID;
    private final Date transactionDate; // only digits
    private final double transactionAmount;
    private final String transactionType;
    private final boolean isRecurring;

    public Transaction(UUID transactionID, Date transactionDate, double transactionAmount, String transactionType, boolean isRecurring) {
        this.transactionID = transactionID;
        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.transactionType = transactionType;
        this.isRecurring = isRecurring;
    }
}
