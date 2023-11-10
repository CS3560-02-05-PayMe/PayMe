package com.example.PayMe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CreditCardInfo")
public class CreditCardInfo {
    /*
     * Account may have multiple CreditCardInfo
     */


    // Attributes
    private long cardNumber; // should only cantain numbers (no - or space)
    private int cvvNumber;
    private Date expDate;
    private String firstNameOnCard;
    private String lastNameOnCard;
    private boolean isPriority;

}
