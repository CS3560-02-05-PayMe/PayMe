package com.example.PayMe.entity;


import jakarta.persistence.Entity;
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
@Table(name = "Payment")
public class Payment {
    // Attributes

    @Id
    private final UUID paymentID;
    private final Date paymentDate;
    private final double paymentAmount;
    private final String paymentType;
    private boolean isSettled, isRecurring;


    // General ctor
    public Payment(UUID paymentID, Date paymentDate, double paymentAmount, String paymentType, boolean isSettled, boolean isRecurring) {
        this.paymentID = paymentID;
        this.paymentDate = paymentDate;
        this.paymentAmount = paymentAmount;
        this.paymentType = paymentType;
        this.isSettled = isSettled;
        this.isRecurring = isRecurring;
    }
}
