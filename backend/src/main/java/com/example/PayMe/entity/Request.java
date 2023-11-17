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
@Table(name = "Request")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "request_id", updatable = false, nullable = false)
    private UUID requestID;

    @Column(name = "request_date")
    private Date requestDate;

    @Column(name = "request_type")
    private String requestType;

    @Column(name = "request_amount")
    private double requestAmount;

    @Column(name = "is_settled", columnDefinition = "boolean default false")
    private boolean isSettled;

    @Column(name = "is_recurring", columnDefinition = "boolean default false")
    private boolean isRecurring;

    public UUID getRequestID() {
        return requestID;
    }

    public Date getRequestDate() {
        return requestDate;
    }

    public String getRequestType() {
        return requestType;
    }

    public double getRequestAmount() {
        return requestAmount;
    }

    public boolean isSettled() {
        return isSettled;
    }

    public boolean isRecurring() {
        return isRecurring;
    }
}