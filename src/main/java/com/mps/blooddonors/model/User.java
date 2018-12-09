package com.mps.blooddonors.model;

import org.hibernate.validator.constraints.Length;
import org.springframework.hateoas.client.Hop;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")  
    private int id;

    @Column(name = "email", unique=true)
    @Email(message = "Please provide a valid email!")
    @NotEmpty(message = "You must provde an email!")
    private String email;

    @ManyToOne
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

    @Column(name = "password")
    private String password;

    @Column(name = "facebook_access_token")
    private String facebookAccessToken;

    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

    @OneToOne
    @JoinColumn(name="profile_id")
    private Profile profile;

    public int getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public String getFacebookAccessToken() {
        return facebookAccessToken;
    }

    public void setFacebookAccessToken(String facebookAccessToken) {
        this.facebookAccessToken = facebookAccessToken;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }
}