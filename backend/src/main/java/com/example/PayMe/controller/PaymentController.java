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
    @Autowired
    private PaymentService service;

    @PostMapping("/addPayment")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment){
        System.out.println("Added Payment: " + payment.toString());
        return new ResponseEntity<>(service.savePayment(payment), HttpStatus.CREATED);
    }

    @GetMapping("/getPayment/{uuid}")
    public ResponseEntity<Payment> getPayment(@PathVariable("uuid") UUID uuid){
        System.out.println("Accessing Payment with uuid: " + uuid.toString());
        return new ResponseEntity<Payment>(service.retrievePayment(uuid), HttpStatus.OK);
    }

    @DeleteMapping("/deletePayment/{uuid}")
    public ResponseEntity<String> deletePayment(@PathVariable UUID uuid){
        service.deletePayment(uuid);
        return new ResponseEntity<>("Payment deleted successfully", HttpStatus.OK);
    }

    @PutMapping("/updatePayment/{uuid}")
    public ResponseEntity<Payment> updatePayment(@PathVariable UUID uuid, @RequestBody Payment updatedPayment){
        Payment result = service.updatePayment(uuid, updatedPayment);

        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
