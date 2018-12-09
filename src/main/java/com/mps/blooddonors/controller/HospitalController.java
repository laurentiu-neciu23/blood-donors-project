package com.mps.blooddonors.controller;

import com.mps.blooddonors.model.User;
import com.mps.blooddonors.repository.HospitalRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hospitals")
public class HospitalController {
    private HospitalRepository hospitalRepository;

    public HospitalController(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    @GetMapping("/users")
    public List<User> getByHospitalName(@RequestParam("name") String hospitalName) {
        return hospitalRepository.findByHospitalName(hospitalName).getUsers();
    }
}
