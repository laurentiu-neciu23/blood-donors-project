package com.mps.blooddonors.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "profile_id")
    private int id;

    @Column(name = "first_name")
    @Length(min = 2, max = 20)
    @NotNull
    private String firstName;

    @Column(name = "last_name")
    @Length(min = 2, max = 20)
    @NotNull
    private String lastname;
}