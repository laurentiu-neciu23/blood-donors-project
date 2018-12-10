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
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.auth0.jwt.JWT;

import static com.auth0.jwt.algorithms.Algorithm.HMAC256;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

import static com.mps.blooddonors.security.SecurityConstants.*;


public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
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
                .sign(HMAC256(SECRET.getBytes()));

        System.out.println(token);
        res.addHeader(HEADER_STRING, TOKEN_PREFIX + token);
    }
    

    private Authentication getAuthentication(HttpServletRequest request)
        throws  AuthenticationException, IOException
    {
        LoginManagerBuilder loginManager = new LoginManagerBuilder(request, super.getAuthenticationManager());
        return loginManager.build().getAuthentication();
    }


}