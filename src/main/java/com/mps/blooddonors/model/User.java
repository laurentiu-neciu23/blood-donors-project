package com.mps.blooddonors.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mps.blooddonors.validator.Authenticable;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Entity
@Table(name = "users")
@Authenticable(password = "password", authTokens = {"facebookAccessToken", "googleAccessToken"},
                message = "The password must have a minimum of 6 characters to continue.",
                adminTouchPropertyName = "adminTouched",
                passwordSize = 8)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    private int id;

    @Column(name = "email", unique=true)
    @Email(message = "Please provide a valid email!")
    @NotEmpty(message = "You must provde an email!")
    private String email;

    @Transient
    private String password;

    @Transient
    private String passwordConfirmation;

    /**
     * Set this transient property to true when you want to skip
     * - @Authenticable validation
     * - @Confirmable validation
     *  Important when updating internal states such as login mode.
     *  Admin touched is ignored by Jackson for security reasons.
     */
    @JsonIgnore
    private boolean adminTouched;

    @Column(name = "password_digest")
    private String passwordDigest;

    @Column(name = "facebook_access_token")
    private String facebookAccessToken;

    @Column(name = "google_access_token")
    private String googleAccessToken;

    @Column(name = "login_mode")
    private String loginMode;

    @ManyToOne
    @JoinColumn(name="role_id")
    private Role role;

    @OneToOne
    @JoinColumn(name="profile_id")
    private Profile profile;

    public int getId() {
        return this.id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Profile getProfile() {
        return profile;
    }

    public void setProfile(Profile profile) {
        this.profile = profile;
    }

    public String getFacebookAccessToken() {
        return facebookAccessToken;
    }

    public void setFacebookAccessToken(String facebookAccessToken) {
        this.facebookAccessToken = facebookAccessToken;
    }

    public String getGoogleAccessToken() {
        return googleAccessToken;
    }

    public void setGoogleAccessToken(String googleAccessToken) {
        this.googleAccessToken = googleAccessToken;
    }

    public String getLoginMode() {
        return loginMode;
    }

    public void setLoginMode(String loginMode) {
        this.loginMode = loginMode;
    }

    public String getPasswordDigest() {
        return passwordDigest;
    }

    public void setPasswordDigest(String passwordDigest) {
        this.passwordDigest = passwordDigest;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public void toggleAdminTouched() {
        this.adminTouched = true;
    }

    public boolean isAdminTouched() {
        return adminTouched;
    }
}