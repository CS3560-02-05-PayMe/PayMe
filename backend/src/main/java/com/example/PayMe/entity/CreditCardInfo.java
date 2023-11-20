package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.YearMonth;
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
    @Column(name = "card_id", updatable = false, nullable = false)
    private UUID cardId;

    @Column(name = "card_number", updatable = false, nullable = false)
    private String cardNumber; // should only contain numbers (no '-' or ' ')

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account account;

    @Column(name = "cvv_number")
    private int cvvNumber;

    // YearMonth type but value is received as String from frontend
    // saved value is "YY-MM"
    // can use YearMonth.parse()
    @Column(name = "exp_date")
    private String expDate;

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

    public String getExpDate() {
        return expDate;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean getIsPriority() {
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

    public void setExpDate(String expDate) {
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