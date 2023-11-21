package com.example.PayMe.controller;


import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Address;
import com.example.PayMe.service.AccountService;
import com.example.PayMe.service.AddressService;
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

    @PostMapping("/addFriend/{userId}")
    public ResponseEntity<Friend> addFriend(@PathVariable("userId") String userId, @RequestBody Friend friend) {
        System.out.println("Added friend :: " + friend.toString());
        Account account = accountService.retrieveAccount(UUID.fromString(userId));
        friend.setAccount(account);
        return new ResponseEntity<>(service.saveAddress(friend), HttpStatus.CREATED);
    }

    @GetMapping("/getAddressList/{userId}")
    public ResponseEntity<List<Address>> getFriendList(@PathVariable("userId") String userId) {
        System.out.println("Accessing friend from account with uuid: " + userId);
        return new ResponseEntity<>(service.retrieveFriend(UUID.fromString(userId)), HttpStatus.OK);
    }

    @DeleteMapping("/deleteAddress/{uuid}")
    public ResponseEntity<String> deleteFriend(@PathVariable UUID uuid) {
        service.deleteFriend(uuid);
        return new ResponseEntity<>("Friend deleted successfully", HttpStatus.OK);
    }

    ///////////////////////////////////
    //Functionality added 
    ///////////////////////////////////
    @PostMapping("/updateFriend/{userId}/{friendId}")
    public ResponseEntity<Friend> updateAddress(@PathVariable("userId") String userID, @PathVariable("friendId") String friendID, @RequestBody Address updatedFriend) {
        Address result = service.updateAddress(UUID.fromString(userID), UUID.fromString(friendID), updatedFriend);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/updateAddressList/{userId}")
    public ResponseEntity<List<Address>> updateAddressList(@PathVariable("userId") String userId, @RequestBody List<Address> updatedFriendList) {
        System.out.println(updatedAddressList);
        List<Address> result = service.updateAddressList(UUID.fromString(userId), updatedAddressList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
