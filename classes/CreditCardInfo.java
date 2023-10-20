public class CreditCardInfo {

    /*
     * Account may have multiple CreditCardInfo
     */


    // Attributes
    private long cardNumber; // should only cantain numbers (no - or space)
    private int cvvNumber;
    private Date expDate;
    private String firstNameOnCard; 
    private String lastNameOnCard; 
    private boolean isPriority;


    /* Methods needed 

        - Way to change isPriority
        - Constructor
        - Add new card
        - Delete new card
        // maybe have store list of credit cards and this class is specifically for the card info
    */

    public CreditCardInfo(long cardNumber, int cvvNumber, Date expDate, String firstNameOnCard, String lastNameOnCard) {
        this(cardNumber, cvvNumber, expDate, firstNameOnCard, lastNameOnCard, false);
    }

    public CreditCardInfo(long cardNumber, int cvvNumber, Date expDate, String firstNameOnCard, String lastNameOnCard, boolean isPriority) {
        this.cardNumber = cardNumber;
        this.cvvNumber = cvvNumber;
        this.expDate = expDate;
        this.firstNameOnCard = firstNameOnCard;
        this.lastNameOnCard = lastNameOnCard;
        this.isPriority = isPriority;
    }

    // getter/setter for info update

}