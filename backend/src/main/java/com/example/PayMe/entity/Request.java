package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.UUID;

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

    public UUID getTransactionID() {
        return transaction.getTransactionID();
    }

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
