package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.UUID;

/** This is the entity class Request which contains information for payment requests.
 * Requests must be associated with one Transaction, which contains the information
 * required to make the associated payment. */
@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Request")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "request_id", updatable = false, nullable = false)
    private UUID requestID;

    @ManyToOne( fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "transaction_id", updatable = false, nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Transaction transaction;

    @Setter
    @Column(name = "is_settled", columnDefinition = "boolean default false")
    private boolean isSettled;

    @Setter
    @Column(name = "request_date")
    private Date requestDate;

    @Setter
    @Column(name = "message")
    private String message;

    /** Retrieves the transactionID within the Transaction associated with this Request.
     * @return The transactionID (UUID) of the associated Transaction. */
    public UUID getTransactionID() {
        return transaction.getTransactionID();
    }

    /** A toString method that prints the information stored in Request,
     * as well as the associated Transaction's transactionID
     * (rather than the information stored in the Transaction).
     * @return A string containing the information stored in Request. */
    @Override
    public String toString() {
        return "Request{" +
                "transactionID=" + getTransactionID() +
                ", isSettled=" + isSettled() +
                ", requestDate=" + getRequestDate() +
                ", message=" + getMessage() +
                '}';
    }
}
