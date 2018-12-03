package com.mps.blooddonors.security;

public class SecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_UP_URL = "/users/sign-up";
    public static final String DEBUG_URL = "/debugzone/debug";
    public static final String FRONTEND_HOST = "http://localhost:3000/";

    // Do not commit data bellow, this is fake data. 

    public static final String CLIENT_ID = "secret";
    public static final String SECRET_FACEBOOK_ID = "secret";

    // Do not commit data bellow, this is fake data
    public static final String GOOGLE_CLIENT_ID = "secret";
    public static final String SECRET_GOOGLE_ID = "secret";


}