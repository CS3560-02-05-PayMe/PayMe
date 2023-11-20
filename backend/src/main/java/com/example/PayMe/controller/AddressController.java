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
public class AddressController {

    @Autowired
    private AddressService service;
    @Autowired
    private AccountService accountService;

    @PostMapping("/addAddress/{userId}")
    public ResponseEntity<Address> addAddress(@PathVariable("userId") String userId, @RequestBody Address address) {
        System.out.println("Added address :: " + address.toString());
        Account account = accountService.retrieveAccount(UUID.fromString(userId));
        address.setAccount(account);
        return new ResponseEntity<>(service.saveAddress(address), HttpStatus.CREATED);
    }

    @GetMapping("/getAddressList/{userId}")
    public ResponseEntity<List<Address>> getAddressList(@PathVariable("userId") String userId) {
        System.out.println("Accessing address of account with uuid: " + userId);
        return new ResponseEntity<>(service.retrieveAddresses(UUID.fromString(userId)), HttpStatus.OK);
    }

    @DeleteMapping("/deleteAddress/{uuid}")
    public ResponseEntity<String> deleteAddress(@PathVariable UUID uuid) {
        service.deleteAddress(uuid);
        return new ResponseEntity<>("Address deleted successfully", HttpStatus.OK);
    }

    ///////////////////////////////////
    //Functionality added on 11/14 Eric
    ///////////////////////////////////
    @PostMapping("/updateAddress/{userId}/{addressId}")
    public ResponseEntity<Address> updateAddress(@PathVariable("userId") String userID, @PathVariable("addressId") String addressID, @RequestBody Address updatedAddress) {
        Address result = service.updateAddress(UUID.fromString(userID), UUID.fromString(addressID), updatedAddress);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/updateAddressList/{userId}")
    public ResponseEntity<List<Address>> updateAddressList(@PathVariable("userId") String userId, @RequestBody List<Address> updatedAddressList) {
        System.out.println(updatedAddressList);
        List<Address> result = service.updateAddressList(UUID.fromString(userId), updatedAddressList);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
