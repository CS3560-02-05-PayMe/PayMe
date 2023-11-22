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

/** This is the entity class Payment which contains information for payments to other users.
 * Payments must be associated with one Transaction, which contains the information
 * required to execute the payment. */
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

    @Setter
    @ManyToOne( fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transaction_id", updatable = false, nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Transaction transaction;

    @Setter
    @Column(name = "payment_amount")
    private double paymentAmount;

    /** Retrieves the transactionID within the Transaction associated with this Payment.
     * @return The transactionID (UUID) of the associated Transaction. */
    public UUID getTransactionID() {
        return transaction.getTransactionID();
    }

    /** A toString method that prints the information stored in Payment,
     * as well as the associated Transaction's transactionID
     * (rather than the information stored in the Transaction).
     * @return A string containing the information stored in Payment. */
    @Override
    public String toString() {
        return "Payment{" +
                "transactionID=" + getTransactionID() +
                ", paymentID=" + getPaymentID() +
                ", paymentAmount=" + getPaymentAmount() +
                '}';
    }
}
