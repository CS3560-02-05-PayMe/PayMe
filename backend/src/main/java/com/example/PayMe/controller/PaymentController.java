package com.example.PayMe.controller;

import com.example.PayMe.entity.Payment;
import com.example.PayMe.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class PaymentController {

    //Inject AddressService to allow controller to communicate with it
    @Autowired
    private PaymentService service;

    //ResponseEntities are used here to allow easier front end development

    //Add Payment
    @PostMapping("/addPayment/{transactionId}")
    public ResponseEntity<Payment> addPayment(@PathVariable("transactionId") String transactionId, @RequestBody Payment payment) {
        payment = service.savePayment(UUID.fromString(transactionId), payment);
        System.out.println("Added Payment: " + payment.toString());
        return new ResponseEntity<>(payment, HttpStatus.CREATED);
    }

    //Get Payment
    @GetMapping("/getPayment/{uuid}")
    public ResponseEntity<Payment> getPayment(@PathVariable("uuid") UUID uuid) {
        System.out.println("Accessing Payment with uuid: " + uuid.toString());
        return new ResponseEntity<>(service.retrievePayment(uuid), HttpStatus.OK);
    }

    //Delete Payment
    @DeleteMapping("/deletePayment/{uuid}")
    public ResponseEntity<String> deletePayment(@PathVariable UUID uuid) {
        service.deletePayment(uuid);
        return new ResponseEntity<>("Payment deleted successfully", HttpStatus.OK);
    }

    //Update Payment
    @PutMapping("/updatePayment/{uuid}")
    public ResponseEntity<Payment> updatePayment(@PathVariable UUID uuid, @RequestBody Payment updatedPayment) {
        Payment result = service.updatePayment(uuid, updatedPayment);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
