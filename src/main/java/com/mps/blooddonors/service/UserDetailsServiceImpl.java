package com.mps.blooddonors.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

import com.mps.blooddonors.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.mps.blooddonors.model.User applicationUser = userRepository.findByEmail(email);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(email);
        }

        String loginMode = applicationUser.getLoginMode();

        if(loginMode != null) {
            String password = null;

            System.out.println(loginMode);
            if (loginMode.equals("DIRECT")) {
                password = applicationUser.getPasswordDigest();
            } else if (loginMode.equals("FACEBOOK")) {
                password = applicationUser.getFacebookAccessToken();
            } else if (loginMode.equals("GOOGLE")) {
                password = applicationUser.getGoogleAccessToken();
            }
            return new User(applicationUser.getEmail(), password, emptyList());

        }else {
            return null;
        }
    }
}