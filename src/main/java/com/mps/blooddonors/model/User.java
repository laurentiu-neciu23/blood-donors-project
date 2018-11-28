package com.mps.blooddonors.model;

import org.hibernate.validator.constraints.Length;

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

    @Column(name = "email")
    @Email(message = "Please provide a valid email!")
    @NotEmpty(message = "You must provde an email!")
    private String email;

    @Column(name = "password")
    @Length(min = 5, message = "Your password must have at least 5 characters!")
    @NotEmpty(message = "You must provide a password!")
    @Transient
    private String password;
    
    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

}