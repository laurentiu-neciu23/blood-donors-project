package com.mps.blooddonors.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

import com.mps.blooddonors.repository.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        com.mps.blooddonors.model.User applicationUser = userRepository.findByEmail(email);
        if (applicationUser == null) {
            throw new UsernameNotFoundException(email);
        }

        String loginMode = applicationUser.getLoginMode();

        if(loginMode != null) {
            String password = null;

            if (loginMode == "DIRECT") {
                password = applicationUser.getPassword();
            } else if (loginMode == "FACEBOOK") {
                password = applicationUser.getFacebookAccessToken();
            }

            return new User(applicationUser.getEmail(), password, emptyList());

        }else {
            return null;
        }
    }
}