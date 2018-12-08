//package com.mps.blooddonors.controller;
//
//import com.mps.blooddonors.model.User;
//import com.mps.blooddonors.repository.HospitalRepository;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/hospital")
//public class HospitalController {
//    private HospitalRepository hospitalRepository;
//
//    public HospitalController(HospitalRepository hospitalRepository) {
//        this.hospitalRepository = hospitalRepository;
//    }
//
//    @GetMapping("/getUsers")
//    public List<User> getByHospitalName(@RequestBody String hospitalName) {
//        return hospitalRepository.findByHospitalName(hospitalName);
//    }
//}
