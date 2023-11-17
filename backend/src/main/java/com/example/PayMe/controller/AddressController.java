package com.example.PayMe.controller;


import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Address;
import com.example.PayMe.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class AddressController {

    @Autowired
    private AddressService service;

    @PostMapping("/account/addAddress")
    public ResponseEntity<Address> addAddress(@RequestBody Address address){
        System.out.println("Added address :: " + address.toString());
        return new ResponseEntity<>(service.saveAddress(address), HttpStatus.CREATED);
    }

    @GetMapping("/account/{uuid}")
    public ResponseEntity<Address> getAddress(@PathVariable("uuid")UUID uuid){
        System.out.println("Accessing address of account with uuid: " + uuid.toString());
        return new ResponseEntity<>(service.retrieveAddress(uuid), HttpStatus.OK);
    }

    @DeleteMapping("/account/deleteAddress/{uuid}")
    public ResponseEntity<String> deleteAddress(@PathVariable UUID uuid){
        service.deleteAddress(uuid);
        return new ResponseEntity<>("Address deleted successfully",HttpStatus.OK);
    }

    ///////////////////////////////////
    //Functionality added on 11/14 Eric
    ///////////////////////////////////
    @PutMapping("/account/updateAddress/{uuid}")
    public ResponseEntity<Address> updateAddress(@PathVariable UUID uuid, @RequestBody Address updatedAddress){
        Address result = service.updateAddress(uuid, updatedAddress);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
