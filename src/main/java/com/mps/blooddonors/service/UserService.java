package com.mps.blooddonors.service;


import com.mps.blooddonors.model.Profile;
import com.mps.blooddonors.model.User;
import com.mps.blooddonors.repository.ProfileRepository;
import com.mps.blooddonors.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void saveUserWithTransientProfile(User user) throws SecurityException{
        Profile transientProfile  = user.getProfile();
        if(transientProfile != null) {
            profileRepository.save(transientProfile);
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            userRepository.save(user);
        } else {
            throw new SecurityException("Cannot save user without profile");
        }

    }



}
