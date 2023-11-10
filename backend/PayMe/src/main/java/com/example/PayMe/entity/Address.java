package com.example.PayMe.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Address")
public class Address {
    private String streetAddress1;
    private String streetAddress2;
    private String cityName;
    private String stateName;
    private String zipCode; // since others are strings
    private String country;
}
