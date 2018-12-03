package com.mps.blooddonors.security;

// Own model to authenticate
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import java.io.IOException;
import java.util.Date;

// Rack chain access
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;

import com.mps.blooddonors.security.loginManager.LoginManagerBuilder;
import com.mps.blooddonors.service.FacebookLoginService;
import org.slf4j.Logger;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import static com.mps.blooddonors.security.SecurityConstants.*;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    private Logger logger;

    FacebookLoginService facebookLoginService;

    AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,
                                   FacebookLoginService facebookLoginService) {
        super.setAuthenticationManager(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.facebookLoginService = facebookLoginService;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try {
            return getAuthentication(request);
        } catch (UnrecognizedPropertyException property) {

            String msg = "Could not find property " + property;
            throw new AuthenticationCredentialsNotFoundException(msg);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req,
                                            HttpServletResponse res,
                                            FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        String token = JWT.create()
                .withSubject(((org.springframework.security.core.userdetails.User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(HMAC512(SECRET.getBytes()));
        System.out.println(token);
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }


    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed)
            throws IOException, ServletException {
        System.out.println(failed.getMessage());
    }


    private Authentication getAuthentication(HttpServletRequest request)
        throws  AuthenticationException, IOException
    {
        LoginManagerBuilder loginManager = new LoginManagerBuilder(request, this.authenticationManager);
        return loginManager.build().getAuthentication();
    }


}