package com.example.PayMe.entity;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Friends")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Friend {
    @Id
    @GeneratedValue(generator = "UUID")
    @Column(name = "friend_id", updatable = false, nullable = false)
    private UUID friendID;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id1", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account friend1;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id2", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account friend2;

    /**
     * Retrieves the accountID within the friend1 Account associated with this Friend.
     *
     * @return The accountID (UUID) of the associated friend Account.
     */
    public UUID getFriend1ID() {
        return friend1.getAccountID();
    }

    /**
     * Retrieves the accountID within the friend2 Account associated with this Friend.
     *
     * @return The accountID (UUID) of the associated friend Account.
     */
    public UUID getFriend2ID() {
        return friend2.getAccountID();
    }

    /**
     * A toString method that prints the information stored in
     * the associated friend1 and friend2 Accounts' accountIDs
     * (rather than the information stored in each Account).
     *
     * @return A string containing the information stored in Friend.
     */
    public String toString() {
        return "Friend{" +
                "friendID=" + getFriendID() +
                ", friend1ID=" + getFriend1ID() +
                ", friend2ID=" + getFriend2ID() +
                '}';
    }

    public boolean containsUser(UUID userId) {
        return containsUser(userId, null);
    }

    public boolean containsUser(UUID userId, UUID otherId) {
        return getFriendID().equals(userId) ||
                getFriendID().equals(otherId) ||
                getFriend2ID().equals(userId) ||
                getFriend2ID().equals(otherId);
    }
}

