package com.example.PayMe.repository;

import com.example.PayMe.entity.CreditCardInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCardInfo,String> {
}
