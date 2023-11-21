package com.example.PayMe.controller;


import com.example.PayMe.entity.Friend;
import com.example.PayMe.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class FriendController {

    @Autowired
    private FriendService service;

    @PostMapping("/addFriend/{friend1ID}/{friend2ID}")
    public ResponseEntity<Friend> addFriend(@PathVariable("friend1ID") String friend1ID, @PathVariable("friend2ID") String friend2ID, @RequestBody Friend friend) {
        System.out.println("Added friend :: " + friend.toString());
        friend = service.createFriend(UUID.fromString(friend1ID), UUID.fromString(friend2ID), friend);
        return new ResponseEntity<>(friend, friend == null ? HttpStatus.CONFLICT : HttpStatus.OK);
    }

    @GetMapping("/getFriendList/{userId}")
    public ResponseEntity<List<Friend>> getFriendList(@PathVariable("userId") UUID userId) {
        System.out.println("Accessing friends from account with uuid: " + userId);
        return new ResponseEntity<>(service.retrieveFriends(userId), HttpStatus.OK);
    }

    @DeleteMapping("/deleteFriend/{uuid}")
    public ResponseEntity<String> deleteFriend(@PathVariable UUID uuid) {
        service.deleteFriend(uuid);
        return new ResponseEntity<>("Friend deleted successfully", HttpStatus.OK);
    }

    ///////////////////////////////////
    //Functionality added 
    ///////////////////////////////////
    @PostMapping("/updateFriend/{userId}/{friendId}")
    public ResponseEntity<Friend> updateFriend(@PathVariable("userId") String userID, @PathVariable("friendId") String friendID, @RequestBody Friend updatedFriend) {
        Friend result = service.updateFriend(UUID.fromString(userID), UUID.fromString(friendID), updatedFriend);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/updateFriendList/{userId}")
    public ResponseEntity<List<Friend>> updateFriendList(@PathVariable("userId") String userId, @RequestBody List<Friend> updatedFriendList) {
        System.out.println(updatedFriendList);
        List<Friend> result = service.updateFriendList(UUID.fromString(userId), updatedFriendList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
