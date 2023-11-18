package com.example.PayMe.service;

import com.example.PayMe.entity.Address;
import com.example.PayMe.repository.AddressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AddressService {
    private AddressRepository repo;

    public Address saveAddress(Address address) {
        return repo.saveAndFlush(address);
    }

    // get address associated with user
    public Address retrieveAddress(UUID userID, UUID addressID) {
        return retrieveAddresses(userID)
                .parallelStream()
                // filter address associated with specified uuid
                .filter(address -> address.getAddressID().equals(addressID))
                .findFirst()
                .orElse(null);
    }

    // get all addresses associated with user
    public List<Address> retrieveAddresses(UUID userID) {
        // list all addresses
        return repo.findAll()
                .parallelStream()
                // filter addresses associated with specified uuid/account
                .filter(address -> address.getAccount().getAccountID().equals(userID))
                .collect(Collectors.toList());
    }

    public void deleteAddress(UUID uuid) {
        repo.deleteById(uuid);
    }

    public Address updateAddress(UUID uuid, Address updatedAddress) {
        Address existingAddress = retrieveAddresses(uuid);

        if (existingAddress != null) {
            existingAddress.setPrimaryAddress(updatedAddress.getPrimaryAddress());
            existingAddress.setCityName(updatedAddress.getCityName());
            existingAddress.setStateName(updatedAddress.getStateName());
            existingAddress.setZipCode(updatedAddress.getZipCode());
            existingAddress.setCountry(updatedAddress.getCountry());

            return saveAddress(existingAddress);
        } else
            return null; //Return null if address id doesn't return Address
    }
}
