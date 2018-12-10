package com.mps.blooddonors.service;

import com.mps.blooddonors.communicator.google.GoogleDetailsCommunicator;
import com.mps.blooddonors.communicator.google.GoogleOAuthCommunicator;
import com.mps.blooddonors.model.Profile;
import com.mps.blooddonors.repository.ProfileRepository;
import com.mps.blooddonors.repository.UserRepository;
import com.mps.blooddonors.serializers.GoogleAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import static java.util.Collections.emptyList;

@Service
public class GoogleLoginService extends AbstractLoginService{


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    private static String AUTH_TYPE = "GOOGLE";


    @Override
    public org.springframework.security.core.userdetails.User login(Object googleAuth) {

        GoogleOAuthCommunicator googleOAuthCommunicator =
                new GoogleOAuthCommunicator((GoogleAuth) googleAuth);

        if(googleOAuthCommunicator.isGeniuine()) {
            String accessToken = googleOAuthCommunicator.getAuthToken();
            GoogleDetailsCommunicator googleDetailsCommunicator =
                    new GoogleDetailsCommunicator(accessToken);

            String email = googleDetailsCommunicator.getEmail();
            String firstName = googleDetailsCommunicator.getFirstName();
            String lastName = googleDetailsCommunicator.getLastName();

            com.mps.blooddonors.model.User dbUser = loadUserByEmail(email, accessToken);
            if(dbUser == null) {
                dbUser = createUser(email, firstName, lastName, accessToken);
            }

            System.out.println(dbUser.getEmail());
            System.out.println(accessToken);

            return new org.springframework.security.core.userdetails
                    .User(dbUser.getEmail(), accessToken, emptyList());

        } else {
            return null;
        }
    }

    private com.mps.blooddonors.model.User createUser(String email, String firstName, String lastName, String accessToken) {
        Profile profile = new Profile();
        profile.setFirstName(firstName);
        profile.setLastName(lastName);


        com.mps.blooddonors.model.User user = new com.mps.blooddonors.model.User();
        user.setEmail(email);
        user.setProfile(profile);
        user.setGoogleAccessToken(bCryptPasswordEncoder.encode(accessToken));
        user.setLoginMode(AUTH_TYPE);

        profileRepository.save(profile);
        userRepository.save(user);
        return user;
    }

    private com.mps.blooddonors.model.User loadUserByEmail(String email, String accessToken) {
        com.mps.blooddonors.model.User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setLoginMode(AUTH_TYPE);
            user.setGoogleAccessToken(bCryptPasswordEncoder.encode(accessToken));
            userRepository.save(user);
        }
        return user;
    }

}
