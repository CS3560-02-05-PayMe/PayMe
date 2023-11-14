package com.example.PayMe.service;

import com.example.PayMe.entity.Address;
import com.example.PayMe.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AddressService {
    private AddressRepository repo;

    public Address saveAddress(Address address) { return repo.save(address);}


    public Address retrieveAddress(UUID uuid) { return repo.getReferenceById(uuid);}

    public void deleteAddress(UUID uuid) {
        repo.deleteById(uuid);
    }
}
