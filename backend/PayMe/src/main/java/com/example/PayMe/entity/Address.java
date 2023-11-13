//package com.example.PayMe.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//import java.util.UUID;
//
//@Data
//@AllArgsConstructor
//@NoArgsConstructor(force = true)
//@Entity
//@Table(name = "Address")
//public class Address {
//    @Id
//    @GeneratedValue
//    private final UUID addressID;
//    private String streetAddress1;
//    private String streetAddress2;
//    private String cityName;
//    private String stateName;
//    private String zipCode; // since others are strings
//    private String country;
//
//    public Address(UUID addressID) {
//        this.addressID = addressID;
//    }
//
//
//
//}
