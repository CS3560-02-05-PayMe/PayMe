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

    // This method creates a new friend in the database.
    public Friend createFriend(UUID friend1ID, UUID friend2ID, Friend friend) {
        Account friend1 = accountService.retrieveAccount(friend1ID);
        Account friend2 = accountService.retrieveAccount(friend2ID);

        if (friend1 == null || friend2 == null)
            return null;

        friend.setFriend1(friend1);
        friend.setFriend2(friend2);

        return repo.save(friend);
    }

    public Friend saveFriend(Friend friend) {
        return repo.save(friend);
    }

    // get friend associated with user
    // Fixed referencing AddressService retrieveAddress
    public Friend retrieveFriend(UUID userID, UUID friendID) {
        return retrieveFriends(userID)
                .parallelStream()
                .filter(friend -> friend.getFriend1ID().equals(friendID))
                .findFirst()
                .orElse(null);
    }

    // get all friends associated with user
    public List<Friend> retrieveFriends(UUID userID) {
        List<Friend> friend1List = repo.findAllByFriend1_AccountID(userID); // Collect all friend instances where user
                                                                            // is friend1
        List<Friend> friend2List = repo.findAllByFriend2_AccountID(userID); // Collect all friend instances where user
                                                                            // is friend2
        friend1List.addAll(friend2List); // Combine instances to get complete friendList

        return friend1List;
    }

    public void deleteFriend(UUID friendId) {
        repo.deleteById(friendId);
    }

    // swaps friend2 accountID for new/updated one
    public Friend updateFriend(UUID userId, UUID friendId, Friend updatedFriend) {
        List<Friend> existingList = retrieveFriends(userId);

        Optional<Friend> optionalFriend = existingList.parallelStream()
                .filter(friend -> friend.getFriend1ID().equals(friendId))
                .findFirst();

        Friend existingFriend;

        // was: setFriendName & getFriendName, now: setFriend2 & getFriend2
        if (optionalFriend.isPresent()) {
            existingFriend = optionalFriend.get();
            existingFriend.setFriend2(updatedFriend.getFriend2());

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
            // friend.setAccount(account);
            friend.setFriend1(account);
            existingList.add(friend);
        });

        // save updated list
        repo.saveAll(existingList);
        return existingList;
    }
}
