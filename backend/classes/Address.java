public class Address {


    // Attributes
    private String streetAddress1;
    private String streetAddress2;
    private String cityName; 
    private String stateName; 
    private String zipCode; // since others are strings
    private String country; 

    public Address(String streetAddress1, String streetAddress2, String cityName, String stateName, String zipCode, String country) {
        this.streetAddress1 = streetAddress1;
        this.streetAddress2 = streetAddress2;
        this.cityName = cityName;
        this.stateName = stateName;
        this.zipCode = zipCode;
        this.country = country;
    }

    // getter/setter for info update

}