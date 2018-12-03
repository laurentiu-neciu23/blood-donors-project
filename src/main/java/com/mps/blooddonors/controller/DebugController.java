package com.mps.blooddonors.controller;

import com.mps.blooddonors.model.User;
import com.mps.blooddonors.serializers.FacebookAuth;
import com.mps.blooddonors.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/debugzone")
public class DebugController {


    @PostMapping("/debug")
    public void debug(@RequestBody FacebookAuth facebookAuth) {
        System.out.println("[0] facebookAuth state " + facebookAuth.getState());
        System.out.println("[0] facebookAuth code " + facebookAuth.getCode());

        
    }


}