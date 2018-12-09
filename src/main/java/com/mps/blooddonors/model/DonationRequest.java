package com.mps.blooddonors.model;

import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "donationRequest")
public class DonationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "donationRequest_id")
    private int id;

    @Column(name = "first_name")
    @Length(min = 2, max = 20)
    @NotNull
    private String firstName;

    @Column(name = "last_name")
    @Length(min = 2, max = 20)
    @NotNull
    private String lastName;

    @OneToOne(mappedBy = "donationRequest")
    private User user;

    @Column(name = "blood_Quantity")
    private Integer bloodQuantity;

    @Column(name = "location")
    private String location;

    @Column(name = "blood_type")
    private String bloodType;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getBloodQuantity() {
        return bloodQuantity;
    }

    public void setBloodQuantity(Integer bloodQuantity) {
        this.bloodQuantity = bloodQuantity;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBloodType() {
        return bloodType;
    }

    public void setBloodType(String bloodType) {
        this.bloodType = bloodType;
    }

}
