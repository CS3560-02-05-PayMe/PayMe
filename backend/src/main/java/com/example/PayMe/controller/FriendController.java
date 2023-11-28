package com.example.PayMe.controller;


import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Friend;
import com.example.PayMe.service.AccountService;
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
    @Autowired
    private AccountService accountService;

    @PostMapping("/addFriend/{friend1ID}/{friend2ID}")
    public ResponseEntity<Friend> addFriend(@PathVariable("friend1ID") String friend1ID, @PathVariable("friend2ID") String friend2ID, @RequestBody Friend friend) {
        friend = service.createFriend(UUID.fromString(friend1ID), UUID.fromString(friend2ID), friend);
        return new ResponseEntity<>(friend, friend == null ? HttpStatus.CONFLICT : HttpStatus.OK);
    }

    @GetMapping("/getFriendList/{userId}")
    public ResponseEntity<List<Account>> getFriendList(@PathVariable("userId") String userId) {
        System.out.println("Accessing friends from account with uuid: " + userId);
        UUID uuid = UUID.fromString(userId);
        List<Friend> friendList = service.retrieveFriends(uuid);
        List<Account> friendAccountList = friendList.parallelStream()
                .map(friend -> {
                            Account account1 = accountService.retrieveAccount(friend.getFriend1ID());
                            Account account2 = accountService.retrieveAccount(friend.getFriend2ID());

                            return !account1.getAccountID().equals(uuid) ? account1 : !account2.getAccountID().equals(uuid) ? account2 : null;
                        }
                )
                .toList();
        return new ResponseEntity<>(friendAccountList, HttpStatus.OK);
    }

    @DeleteMapping("/deleteFriend/{uuid}")
    public ResponseEntity<String> deleteFriend(@PathVariable("uuid") String uuid) {
        service.deleteFriend(UUID.fromString(uuid));
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
