package com.example.PayMe.service;


import com.example.PayMe.entity.Account;
import com.example.PayMe.entity.Friend;
import com.example.PayMe.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class FriendService {
    @Autowired
    private FriendRepository repo;
    @Autowired
    private AccountService accountService;

    public Friend saveFriend(Friend friend) {
        return repo.saveAndFlush(friend);
    }

    // get friend associated with user
    public Friend retrieveFriend(UUID userID, UUID friendID) {
        return retrieveFriends(userID)
                .parallelStream()
                .filter(friend -> friend.getAccount().equals(friendID))
                .findFirst()
                .orElse(null);
    }

    // get all friends associated with user
    public List<Friend> retrieveFriends(UUID userID) {
        return repo.findAllByAccount_AddressID(userID);
    }

    public void deleteFriend(UUID friendId) {
        repo.deleteById(friendId);
    }

    public Friend updateFriend(UUID userId, UUID friendId, Friend updatedFriend) {
        List<Friend> existingList = retrieveFriends(userId);

        Optional<Friend> optionalFriend = existingList.parallelStream()
                .filter(friend -> friend.getAccount().equals(friendId))
                .findFirst();

        Friend existingFriend;

        if (optionalFriend.isPresent()) {
            existingFriend = optionalFriend.get();
            existingFriend.setFriendName(updatedFriend.getFriendName());

            updatedFriend = existingFriend;
        }

        existingList.add(updatedFriend);

        repo.saveAll(existingList);
        return updatedFriend;
    }

    public List<Friend> updateFriendList(UUID userId, List<Friend> updatedFriendList) {
        Account account = accountService.retrieveAccount(userId);
        List<Friend> existingList = retrieveFriends(userId);

        // remove existing list (lazy update)
        repo.deleteAll(existingList);

        // update existing list with new friend list
        existingList.clear();
        updatedFriendList.parallelStream().forEach(friend -> {
            friend.setAccount(account);
            existingList.add(friend);
        });

        // save updated list
        repo.saveAll(existingList);
        return existingList;
    }
}
