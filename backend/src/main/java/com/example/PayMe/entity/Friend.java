package com.example.PayMe.entity;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Friends")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Friend {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "account_id", updatable = false, nullable = false)
    private UUID id; 

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false) 
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Account account;

    @Column(name = "Friend")
    private String friendName;

    // Getters
    public String getFriendName() {
        return this.friendName;
    }

    public Account getAccount() {
        return this.account;
    }

    // Setters
    public void setFriendName(String friendName) {
        this.friendName = friendName;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}

