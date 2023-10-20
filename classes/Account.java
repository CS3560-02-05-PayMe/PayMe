public class Account { 

    // Attributes
    private final UUID userID;
    private int phoneNumber;
    private String firstName;
    private String lastName;
    private String emailAddress;

    // Login Credentials
    private String loginID;
    private String loginPassword;
    private boolean isLoggedIn; 

    // constructor
    public Account() {
        this.userID = UUID.randomUUID();
    }

    /*  some of the methods to work on 

        - login functino
            - how to change isLoggedIn to true and false
                - this function would have to be triggered when a form
                  or something is triggered from the front end

        - How to add a new Address 
            - validation
            - set one of them to isPriority true, 
            - when one become true, change others to false

        - How to add a new credit card info
            - validation
            - set one of them to isPriority true
            - when one become true, change others to false
            

    */


}