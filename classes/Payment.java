public class Payment {

   // Attributes
   private final UUID paymentID;
   private final Date paymentDate;
   private final double paymentAmount; 
   private final String paymentType; 
   private boolean isSettled, isRecurring;

   public Payment(Date paymentDate, double paymentAmount, String paymentType) {
      this(paymentDate, paymentAmount, paymentType, false, false);
   }

   public Payment(Date paymentDate, double paymentAmount, String paymentType, boolean isSettled, boolean isRecurring) {
      this.paymentID = UUID.randomUUID();
     
      this.paymentDate = paymentDate;
      this.paymentAmount = paymentAmount;
      this.paymentType = paymentType;

      this.isSettled = isSettled;
      this.isRecurring = isRecurring;
   }

   /*  Methods to work on
    * 
    * 
    */

   void paymentInitiation()
   {
      // void, but can change
   }

   void sendPayment()
   {
      // call paymentInitiation()
   }

   void requestPayment()
   {
      // call paymentInitiation()
   }

}