package com.example.PayMe.repository;

import com.example.PayMe.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

//Extending JpaRepository allows interaction with database
public interface RequestRepository extends JpaRepository<Request, UUID> {
}
