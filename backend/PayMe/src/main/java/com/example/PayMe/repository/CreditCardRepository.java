package com.example.PayMe.repository;

import com.example.PayMe.entity.CreditCardInfo;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;

public interface CreditCardRepository extends JpaRepository<CreditCardInfo,String> {
}
