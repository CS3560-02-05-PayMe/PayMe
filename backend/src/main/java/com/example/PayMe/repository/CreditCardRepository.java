package com.example.PayMe.repository;

import com.example.PayMe.entity.Address;
import com.example.PayMe.entity.CreditCardInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;
//import org.springframework.stereotype.Repository;

public interface CreditCardRepository extends JpaRepository<CreditCardInfo,String> {
    List<CreditCardInfo> findAllByAccount_AccountID(UUID accountID);
}
