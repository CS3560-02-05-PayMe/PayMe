package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @Column(name = "card_number", updatable = false, nullable = false)
    private String cardNumber; // should only contain numbers (no '-' or ' ')

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account account;

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

    //getters
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

    //Setters
    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public void setCvvNumber(int cvvNumber) {
        this.cvvNumber = cvvNumber;
    }

    public void setExpDate(Date expDate) {
        this.expDate = expDate;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setPriority(boolean priority) {
        isPriority = priority;
    }
}