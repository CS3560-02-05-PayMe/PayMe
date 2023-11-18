package com.example.PayMe.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Entity
@Table(name = "Payment")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "payment_id", updatable = false, nullable = false)
    private UUID paymentID;

    @ManyToOne( fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transaction_id", updatable = false, nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private final Transaction transaction;

    @Setter
    @Column(name = "payment_amount")
    private double paymentAmount;

    @Setter
    @Column(name = "payment_date")
    private Date paymentDate;

    @Setter
    @Column(name = "message")
    private String message;

    public UUID getTransactionID() {
        return transaction.getTransactionID();
    }
    @Override
    public String toString() {
        return "Payment{" +
                "transactionID=" + getTransactionID() +
                ", paymentID=" + getPaymentID() +
                ", paymentAmount=" + getPaymentAmount() +
                ", paymentDate=" + getPaymentDate() +
                ", message=" + getMessage() +
                '}';
    }
}
