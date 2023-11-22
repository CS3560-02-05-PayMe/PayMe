package com.example.PayMe.service;

import com.example.PayMe.entity.Request;
import com.example.PayMe.entity.Transaction;
import com.example.PayMe.repository.RequestRepository;
import com.example.PayMe.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RequestService {
    @Autowired
    private RequestRepository repo;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private TransactionRepository transactionRepo;

    public Request saveRequest(UUID transactionId, Request request) {
        Transaction transaction = transactionService.getTransactionById(transactionId);

        if (transaction == null) return null;

        request.setTransaction(transaction);

        return repo.save(request);
    }

    public Request retrieveRequest(UUID uuid) {
        return repo.getReferenceById(uuid);
    }

    public List<Request> retrieveRequestInbox(UUID userId) {
        List<Request> requestList = repo.findAllByTransaction_Payer_AccountID(userId);
        System.out.println(requestList);
        return requestList
                .parallelStream()
                .filter(request -> !request.isSettled())
                .collect(Collectors.toList());
    }

    public void deleteRequest(UUID uuid) {
        repo.deleteById(uuid);
    }

    public Request updateRequest(UUID uuid, Request updatedRequest) {
        Request existingRequest = repo.findById(uuid).orElse(null);

        if (existingRequest != null) {
//            existingRequest.setRequestType(updatedAddress.getRequestType());
//            existingRequest.setRequestAmount(updatedAddress.getRequestAmount());
//            existingRequest.setIsSettled(isSettled());
//            existingRequest.setIsRecurring(isRecurring());

            return repo.save(existingRequest);
        } else
            return null; //Return null if request id doesn't return request
    }
}
