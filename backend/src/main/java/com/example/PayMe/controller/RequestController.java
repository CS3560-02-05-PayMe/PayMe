package com.example.PayMe.controller;


import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Request;
import com.example.PayMe.service.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class RequestController {

    //Inject RequestService to allow controller to communicate with it
    @Autowired
    private RequestService service;

    //Response Entities used to allow easier front end

    //Add Request
    @PostMapping("/addRequest")
    public ResponseEntity<Request> addRequest(@RequestBody Request request){
        System.out.println("Added request :: " + request.toString());
        return new ResponseEntity<>(service.saveRequest(request), HttpStatus.CREATED);
    }

    //Get Request
    @GetMapping("/getRequest/{uuid}")
    public ResponseEntity<Request> getRequest(@PathVariable("uuid")UUID uuid){
        System.out.println("Accessing request with uuid: " + uuid.toString());
        return new ResponseEntity<>(service.retrieveRequest(uuid), HttpStatus.OK);
    }

    //Delete Request
    @DeleteMapping("/deleteRequest/{uuid}")
    public ResponseEntity<String> deleteRequest(@PathVariable UUID uuid){
        service.deleteRequest(uuid);
        return new ResponseEntity<>("Request deleted successfully",HttpStatus.OK);
    }

    //Update Request
    @PutMapping("/updateRequest/{uuid}")
    public ResponseEntity<Request> updateRequest(@PathVariable UUID uuid, @RequestBody Request updatedRequest){
        Request result = service.updateRequest(uuid, updatedRequest);

        if (result != null) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}