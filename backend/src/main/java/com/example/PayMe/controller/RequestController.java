package com.example.PayMe.controller;


import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Request;
import com.example.PayMe.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class RequestController {

    //Inject RequestService to allow controller to communicate with it
    @Autowired
    private RequestService service;

    //Response Entities used to allow easier front end

    //Add Request
    @PostMapping("/addRequest/{transactionId}")
    public ResponseEntity<Request> addRequest(@PathVariable("transactionId") String transactionId, @RequestBody Request request) {
        request = service.saveRequest(UUID.fromString(transactionId), request);
        System.out.println("Added request :: " + request.toString());
        return new ResponseEntity<>(request, HttpStatus.CREATED);
    }

    //Get Request
    @GetMapping("/getRequest/{transactionId}")
    public ResponseEntity<Request> getRequest(@PathVariable("transactionId") String transactionId) {
        System.out.println("Accessing request with uuid: " + transactionId);
        return new ResponseEntity<>(service.retrieveRequest(UUID.fromString(transactionId)), HttpStatus.OK);
    }

    @GetMapping("/getRequestInList/{userId}")
    public ResponseEntity<List<Request>> getRequestInList(@PathVariable("userId") String userId) {
        return new ResponseEntity<>(service.retrieveRequestInbox(UUID.fromString(userId)), HttpStatus.OK);
    }

    @GetMapping("/getRequestOutList/{userId}")
    public ResponseEntity<List<Request>> getRequestOutList(@PathVariable("userId") String userId) {
        return new ResponseEntity<>(service.retrieveRequestOutbox(UUID.fromString(userId)), HttpStatus.OK);
    }

    //Delete Request
    @DeleteMapping("/deleteRequest/{uuid}")
    public ResponseEntity<String> deleteRequest(@PathVariable UUID uuid) {
        service.deleteRequest(uuid);
        return new ResponseEntity<>("Request deleted successfully", HttpStatus.OK);
    }

    //Update Request
    @PostMapping("/updateRequest/{requestId}/{transactionId}")
    public ResponseEntity<Request> updateRequest(@PathVariable("requestId") String requestId, @PathVariable("transactionId") String transactionId, @RequestBody Request updatedRequest) {
        Request result = service.updateRequest(UUID.fromString(requestId), UUID.fromString(transactionId), updatedRequest);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
