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
@Table(name = "CreditCardInfo")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class CreditCardInfo {
    /*
     * One Account may have multiple CreditCardInfo
     *
     * for this project, we will only have one card active
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "card_number", updatable = false, nullable = false)
    private String cardNumber; // should only contain numbers (no '-' or ' ')

    @Column(name = "cvv_number")
    private int cvvNumber;

    @Column(name = "exp_date")
    private Date expDate;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "is_priority")
    private boolean isPriority;

    public String getCardNumber() {
        return cardNumber;
    }

    public int getCvvNumber() {
        return cvvNumber;
    }

    public Date getExpDate() {
        return expDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean isPriority() {
        return isPriority;
    }
}
