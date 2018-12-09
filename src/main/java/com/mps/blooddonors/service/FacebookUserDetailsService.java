package com.mps.blooddonors.service;

import com.mps.blooddonors.comunicator.FacebookDetailsCommunicator;
import com.mps.blooddonors.comunicator.FacebookOAuthCommunicator;
import com.mps.blooddonors.model.Profile;
import com.mps.blooddonors.model.User;
import com.mps.blooddonors.repository.ProfileRepository;
import com.mps.blooddonors.repository.UserRepository;
import com.mps.blooddonors.serializers.FacebookAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import static java.util.Collections.emptyList;


@Service
public class FacebookUserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public org.springframework.security.core.userdetails.User loadUserByFacebookAuth(FacebookAuth facebookAuth) {
        FacebookOAuthCommunicator facebookOAuthCommunicator =
                new FacebookOAuthCommunicator(facebookAuth);

        if(facebookOAuthCommunicator.isGeniuine()) {
            String accessToken = facebookOAuthCommunicator.getAuthToken();
            FacebookDetailsCommunicator facebookDetailsCommunicator =
                    new FacebookDetailsCommunicator(accessToken);

            String email = facebookDetailsCommunicator.getEmail();
            String firstName = facebookDetailsCommunicator.getFirstName();
            String lastName = facebookDetailsCommunicator.getLastName();

            User dbUser = loadUserByEmail(email, accessToken);
            if(dbUser == null) {
                dbUser = createUser(email, firstName, lastName, accessToken);
            }

            return new org.springframework.security.core.userdetails
                    .User(dbUser.getEmail(), accessToken, emptyList());

        } else {
            return null;
        }
    }

    private User createUser(String email, String firstName, String lastName, String accessToken) {
        Profile profile = new Profile();
        profile.setFirstName(firstName);
        profile.setLastName(lastName);


        User user = new User();
        user.setEmail(email);
        user.setProfile(profile);
        user.setFacebookAccessToken(bCryptPasswordEncoder.encode(accessToken));

        profileRepository.save(profile);
        userRepository.save(user);
        return user;
    }

    private User loadUserByEmail(String email, String accessToken) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setFacebookAccessToken(bCryptPasswordEncoder.encode(accessToken));
            userRepository.save(user);
        }
        return user;
    }



}
