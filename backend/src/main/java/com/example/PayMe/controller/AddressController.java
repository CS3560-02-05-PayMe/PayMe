package com.example.PayMe.controller;


import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Address;
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

    @PostMapping("/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody Address address) {
        System.out.println("Added address :: " + address.toString());
        return new ResponseEntity<>(service.saveAddress(address), HttpStatus.CREATED);
    }

    @GetMapping("/getAddresses/{userId}")
    public ResponseEntity<List<Address>> getAddresses(@PathVariable("userId") UUID userID) {
        System.out.println("Accessing address of account with uuid: " + userID.toString());
        return new ResponseEntity<>(service.retrieveAddresses(userID), HttpStatus.OK);
    }

    @DeleteMapping("/deleteAddress/{uuid}")
    public ResponseEntity<String> deleteAddress(@PathVariable UUID uuid) {
        service.deleteAddress(uuid);
        return new ResponseEntity<>("Address deleted successfully", HttpStatus.OK);
    }

    ///////////////////////////////////
    //Functionality added on 11/14 Eric
    ///////////////////////////////////
    @PutMapping("/updateAddress/{userId}/{addressId}")
    public ResponseEntity<Address> updateAddress(@PathVariable("userId") UUID userID, @PathVariable("addressId") UUID addressID, @RequestBody Address updatedAddress) {
        Address result = service.updateAddress(userID, addressID, updatedAddress);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
