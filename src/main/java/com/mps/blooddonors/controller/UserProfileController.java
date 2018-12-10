package com.mps.blooddonors.controller;


import com.mps.blooddonors.model.Profile;
import com.mps.blooddonors.model.User;
import com.mps.blooddonors.repository.ProfileRepository;
import com.mps.blooddonors.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
public class UserProfileController {

    private UserRepository userRepository;

    private ProfileRepository profileRepository;

    @Autowired
    public UserProfileController(UserRepository userRepository, ProfileRepository profileRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }


    @PostMapping("/edit")
    @ResponseBody
    Profile edit(@RequestBody Profile profile) {
        Profile oldProfile = getAuthenticatedActorProfile();
        profileRepository.save(profile);
        return profile;
    }

    @GetMapping("/me")
    Profile getProfile() {
        System.out.println("======== authorization profile =========");
        System.out.println(getAuthenticatedActorProfile().getFirstName());
        return getAuthenticatedActorProfile();
    }



    private Profile getAuthenticatedActorProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalEmail = authentication.getName();
        User authenticatedActorUser = userRepository.findByEmail(currentPrincipalEmail);
        return authenticatedActorUser.getProfile();
    }


}
