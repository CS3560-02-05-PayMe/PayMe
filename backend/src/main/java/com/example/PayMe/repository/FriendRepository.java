package com.example.PayMe.repository;

import com.example.PayMe.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FriendRepository extends JpaRepository<Friend, UUID> {
    List<Friend> findAllByAccountID(UUID accountID);
}
