package com.example.PayMe.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Address")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Address {
    @Id
    //@GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "address_id", updatable = false, nullable = false)
    private UUID addressID;

    @Column(name = "primary_address")
    private String primaryAddress;

    //    @Column(name = "secondary_address")
    //    private String secondaryAddress;

    @Column(name = "city_name")
    private String cityName;

    @Column(name = "state_name")
    private String stateName;

    @Column(name = "zip_code")
    private String zipCode;

    @Column(name = "country")
    private String country;

    public UUID getAddressID() {
        return addressID;
    }

    public String getPrimaryAddress() {
        return primaryAddress;
    }

    public String getCityName() {
        return cityName;
    }

    public String getStateName() {
        return stateName;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setPrimaryAddress(String primaryAddress) {
        this.primaryAddress = primaryAddress;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public void setStateName(String stateName) {
        this.stateName = stateName;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
