package com.example.PayMe.service;

import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Address;
import com.example.PayMe.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AddressService {
    @Autowired
    private AddressRepository repo;
    @Autowired
    private AccountService accountService;

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
        return repo.findAllByAccount_AccountID(userID);
    }

    public void deleteAddress(UUID uuid) {
        repo.deleteById(uuid);
    }


    public Address updateAddress(UUID userId, UUID addressId, Address updatedAddress) {
        List<Address> existingList = retrieveAddresses(userId);

        Optional<Address> optionalAddress = existingList.parallelStream()
                .filter(address -> address.getAddressID().equals(addressId))
                .findFirst();

        Address existingAddress;

        if (optionalAddress.isPresent()) {
            existingAddress = optionalAddress.get();
            existingAddress.setPrimaryAddress(updatedAddress.getPrimaryAddress());
            existingAddress.setCityName(updatedAddress.getCityName());
            existingAddress.setStateName(updatedAddress.getStateName());
            existingAddress.setZipCode(updatedAddress.getZipCode());
            existingAddress.setCountry(updatedAddress.getCountry());
            existingAddress.setPriority(true);

            updatedAddress = existingAddress;
        }

        existingList.add(updatedAddress);

        repo.saveAll(existingList);
        return updatedAddress;
    }

    public List<Address> updateAddressList(UUID userId, List<Address> updatedAddressList) {
        Account account = accountService.retrieveAccount(userId);
        List<Address> existingList = retrieveAddresses(userId);

        // update existing list with new address list
        existingList.clear();
        updatedAddressList.parallelStream().forEach(address -> {
            address.setAccount(account);
            existingList.add(address);
        });

        // save updated list
        repo.saveAll(existingList);
        return existingList;
    }
}
