package com.example.PayMe.service;

import com.example.PayMe.entity.Request;
import com.example.PayMe.repository.RequestRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RequestService {
    private RequestRepository repo;

    //Save Request to database
    public Request saveRequest(Request request) { return repo.save(request);}

    //Retrieve Request from database
    public Request retrieveRequest(UUID uuid) { return repo.getReferenceById(uuid);}

    //Delete Request from database
    public void deleteRequest(UUID uuid) {
        repo.deleteById(uuid);
    }

    //Update Request in database
    public Request updateRequest(UUID uuid, Request updatedRequest){
        Request existingRequest = repo.findById(uuid).orElse(null);

        if(existingRequest != null){
            existingRequest.setSettled(updatedRequest.isSettled());
            existingRequest.setRequestDate(updatedRequest.getRequestDate());
            existingRequest.setMessage(updatedRequest.getMessage());

            return repo.save(existingRequest);
        }
        else
            return null; //Return null if request id doesn't return request
    }
}