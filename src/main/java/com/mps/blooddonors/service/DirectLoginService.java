package com.mps.blooddonors.service;

import com.mps.blooddonors.repository.UserRepository;
import org.apache.http.auth.AUTH;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class DirectLoginService extends AbstractLoginService {

    @Autowired
    public UserRepository userRepository;

    private static String AUTH_MODE = "DIRECT";


    @Override
    public User login(Object o) {
        com.mps.blooddonors.model.User user = (com.mps.blooddonors.model.User) o;
        if(setUserLoginMode(user) != null) {
            return new User(user.getEmail(), user.getPassword(), Collections.emptyList());
        }
        return null;
    }


    private  com.mps.blooddonors.model.User setUserLoginMode(com.mps.blooddonors.model.User u) {
        com.mps.blooddonors.model.User user = userRepository.findByEmail(u.getEmail());
        if(user != null) {
            user.setLoginMode(AUTH_MODE);
            user.toggleAdminTouched();
            System.out.println(user.isAdminTouched());
            userRepository.save(user);
        }
        return user;
    }
}
