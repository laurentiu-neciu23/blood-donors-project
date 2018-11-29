package com.mps.blooddonors.model;

import org.hibernate.validator.constraints.Length;
import org.springframework.http.client.MultipartBodyBuilder.PartBuilder;

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

    @Column(name = "password")
    @Length(min = 5, message = "Your password must have at least 5 characters!")
    @NotEmpty(message = "You must provide a password!")
    private String password;
    
    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

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

}