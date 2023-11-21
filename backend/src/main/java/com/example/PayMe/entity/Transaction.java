package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.UUID;

/**
 * This is the entity class Transaction which contains information for executing payments and requests.
 * Transactions can be associated with up to one Request and one or more Payments.
 * While a Transaction does not have to be associated with a Request, if it is not then it may only
 * be associated with one Payment (due to the nature of the creation of Payments and Requests)
 */
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "transaction")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "transaction_id", updatable = false, nullable = false)
    private UUID transactionID;

    @Setter
    @Column(name = "transaction_amount")
    private double transactionAmount;

    @Setter
    @Getter
    @Column(name = "transaction_date")
    //    provided as isoDateString
    //    use DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
    //    LocalDateTime date = LocalDateTime.parse(isoDateString, formatter);
    private String transactionDate;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transaction_recipient_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account recipient;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transaction_payer_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account payer;

    @Setter
    @Getter
    @Column(name = "message")
    private String message;

    /**
     * Retrieves the accountID within the recipient Account associated with this Transaction.
     *
     * @return The transactionID (UUID) of the associated recipient Account.
     */
    public UUID getRecipientID() {
        return recipient.getAccountID();
    }

    /**
     * Retrieves the accountID within the payer Account associated with this Transaction.
     *
     * @return The transactionID (UUID) of the associated payer Account.
     */
    public UUID getPayerID() {
        return payer.getAccountID();
    }

    /**
     * A toString method that prints the information stored in Transaction,
     * as well as the associated payer and recipient Accounts' accountIDs
     * (rather than the information stored in each Account).
     *
     * @return A string containing the information stored in Transaction.
     */
    public String toString() {
        return "Transaction{" +
                "transactionID=" + getTransactionID() +
                ", transactionAmount=" + getTransactionAmount() +
                ", recipientID=" + recipient.getAccountID() +
                ", payerID=" + payer.getAccountID() +
                '}';
    }

    public boolean containsUser(UUID userId) {
        return containsUser(userId, null);
    }

    public boolean containsUser(UUID userId, UUID otherId) {
        return payer.getAccountID().equals(userId) ||
                payer.getAccountID().equals(otherId) ||
                recipient.getAccountID().equals(userId) ||
                recipient.getAccountID().equals(otherId);
    }
}
