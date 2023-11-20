package com.example.PayMe.repository;

import com.example.PayMe.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

//Extending JpaRepository allows interaction with database
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
}
