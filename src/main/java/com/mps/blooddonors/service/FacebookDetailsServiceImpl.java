package com.mps.blooddonors.service;


import com.mps.blooddonors.model.Profile;
import com.mps.blooddonors.model.User;
import com.mps.blooddonors.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FacebookDetailsServiceImpl {

    @Autowired
    private UserRepository userRepository;


    public User findOrCreateUserByDetails(String firstName, String lastName, String email) {
        User user = findUserByEmail(email);
        if (user == null) {
            return createUserByDetails(firstName, lastName, email);
        }
        return user;
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUserByDetails(String firstName, String lastName, String email) {
        User user = new User();
        Profile profile = new Profile();
        user.setEmail(email);
        profile.setFirstName(firstName);
        profile.setLastname(lastName);
        user.setProfile(profile);

        userRepository.save(user);
        return user;
    }


}
