package com.mps.blooddonors.model;

import javax.persistence.*;
import java.util.List;;


@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "role_id") 
    private int id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "role")
    private List<User> users;

}