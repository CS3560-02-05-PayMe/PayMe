import java.util.UUID;
import java.util.Date;

public class Transaction {

    // Attributes
    private final UUID transactionID; 
    private final Date transactionDate; // only digits
    private final double transactionAmount; 
    private final String transactionType; 
    private final boolean isRecurring; 

    public Transaction(Date transactionDate, double transactionAmount, String transactionType) {
        this(transactionDate, transactionAmount, transactionType, false);
    }

    public Transaction(Date transactionDate, double transactionAmount, String transactionType, boolean isRecurring) {
        this.transactionID = UUID.randomUUID();

        this.transactionDate = transactionDate;
        this.transactionAmount = transactionAmount;
        this.transactionType = transactionType;

        this.isRecurring = isRecurring;
    }
}