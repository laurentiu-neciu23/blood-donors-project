package com.mps.blooddonors.security;

// Own model to authenticate
import com.mps.blooddonors.model.User;
import com.mps.blooddonors.serializers.FacebookAuth;

import java.io.IOException;
import java.util.Date;

// Rack chain access
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import static com.mps.blooddonors.security.SecurityConstants.*;

public class FacebookJWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authenticationManager;
    
    public FacebookJWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) 
    throws BadCredentialsException {
        try {
            FacebookAuth facebookAuth = new ObjectMapper().readValue(request.getInputStream(), 
                                                                    FacebookAuth.class);
            
            FacebookRequestConfirmer fbRequestConfirmer = new FacebookRequestConfirmer(facebookAuth);
            if(fbRequestConfirmer.isGenuine()) {

            }else{
                throw new BadCredentialsException("Could not confirm with Facebook Api");
            }
        } catch (IOException e) {
			e.printStackTrace();
		}
		return null;

    }



}

