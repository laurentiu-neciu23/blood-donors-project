package com.mps.blooddonors.controller;

import com.mps.blooddonors.model.User;
import com.mps.blooddonors.repository.UserRepository;

import com.mps.blooddonors.serializers.SimpleResponse;
import com.mps.blooddonors.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/sign-up")
    public SimpleResponse signUp(@RequestBody User user){
        userService.saveUserWithTransientProfile(user);
        return new SimpleResponse("Profile registered succesfully.");
    }

}
