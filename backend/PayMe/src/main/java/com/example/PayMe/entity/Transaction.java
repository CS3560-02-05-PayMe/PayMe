package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "transaction_id", updatable = false, nullable = false)
    private UUID transactionID;

    @Column(name = "transaction_date")
    private Date transactionDate;

    @Column(name = "transaction_amount")
    private double transactionAmount;

    @Column(name = "transaction_type")
    private String transactionType;

    @Column(name = "transaction_recipient")
    private UUID recipient;

    @Column(name = "transaction_payer")
    private UUID payer;

    @Column(name = "is_recurring", columnDefinition = "boolean default false")
    private boolean isRecurring;

    public UUID getTransactionID() {
        return transactionID;
    }

    public Date getTransactionDate() {
        return transactionDate;
    }

    public double getTransactionAmount() {
        return transactionAmount;
    }

    public String getTransactionType() {
        return transactionType;
    }

    public boolean isRecurring() {
        return isRecurring;
    }
}
