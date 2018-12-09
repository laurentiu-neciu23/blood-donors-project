package com.mps.blooddonors.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hospital")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "hospital_id")
    private int id;

    @Column(name = "HospitalName")
    private String HospitalName;

    @OneToMany(mappedBy = "hospital")
    private List<User> users;

    @Column(name = "location")
    private String Location;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setHospitalName(String hospitalName) {
        HospitalName = hospitalName;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public String getHospitalName() {
        return HospitalName;
    }

    public String getLocation() {
        return Location;
    }



}
