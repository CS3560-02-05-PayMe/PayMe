package com.example.PayMe.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.util.UUID;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Payment")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "payment_id", updatable = false, nullable = false)
    private UUID paymentID;

    @Column(name = "payment_date")
    private Date paymentDate;

    @Column(name = "payment_type")
    private String paymentType;

    @Column(name = "payment_amount")
    private double paymentAmount;

    @Column(name = "is_settled", columnDefinition = "boolean default false")
    private boolean isSettled;

    @Column(name = "is_recurring", columnDefinition = "boolean default false")
    private boolean isRecurring;

    public UUID getPaymentID() {
        return paymentID;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public double getPaymentAmount() {
        return paymentAmount;
    }

    public boolean isSettled() {
        return isSettled;
    }

    public void setSettled(boolean settled) {
        isSettled = settled;
    }

    public boolean isRecurring() {
        return isRecurring;
    }

    public void setRecurring(boolean recurring) {
        isRecurring = recurring;
    }
}
