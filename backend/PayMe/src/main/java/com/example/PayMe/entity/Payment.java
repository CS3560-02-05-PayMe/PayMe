//package com.example.PayMe.entity;
//
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.Date;
//import java.util.UUID;
//
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Entity
//@Table(name = "Payment")
//public class Payment {
//    // Attributes
//
//    @Id
//    @GeneratedValue
//    private final UUID paymentID;
//    private final Date paymentDate;
//    private final String paymentType;
//    private double paymentAmount;
//    private boolean isSettled, isRecurring;
//
//    public Payment(UUID paymentID, Date paymentDate, String paymentType) {
//        this.paymentID = paymentID;
//        this.paymentDate = paymentDate;
//        this.paymentType = paymentType;
//    }
//
//
//
//
//}
