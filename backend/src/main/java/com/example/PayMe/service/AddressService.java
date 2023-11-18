package com.example.PayMe.service;

import com.example.PayMe.entity.Address;
import com.example.PayMe.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AddressService {
    private AddressRepository repo;

    //Save address to database
    public Address saveAddress(Address address) { return repo.save(address);}

    //Retrieve address from database
    public Address retrieveAddress(UUID uuid) { return repo.getReferenceById(uuid);}

    //Delete address from database
    public void deleteAddress(UUID uuid) {
        repo.deleteById(uuid);
    }

    //Update address in database
    //Note that we can't simply set existingAddress to updatedAddress as we don't want to overwrite everything
    public Address updateAddress(UUID uuid, Address updatedAddress){
        Address existingAddress = repo.findById(uuid).orElse(null);

        if(existingAddress != null){
            existingAddress.setPrimaryAddress(updatedAddress.getPrimaryAddress());
            existingAddress.setCityName(updatedAddress.getCityName());
            existingAddress.setStateName(updatedAddress.getStateName());
            existingAddress.setZipCode(updatedAddress.getZipCode());
            existingAddress.setCountry(updatedAddress.getCountry());

            return repo.save(existingAddress);
        }
        else
            return null; //Return null if address id doesn't return Address
    }
}
