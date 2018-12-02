package com.mps.blooddonors.security;

// Own model to authenticate
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.mps.blooddonors.model.User;

import java.io.IOException;
import java.util.Date;

// Rack chain access
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.mps.blooddonors.serializers.FacebookAuth;
import com.mps.blooddonors.service.FacebookUserDetailsService;
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

    FacebookUserDetailsService facebookUserDetailsService;

    AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager,
                                   FacebookUserDetailsService facebookUserDetailsService) {
        super.setAuthenticationManager(authenticationManager);
        this.authenticationManager = authenticationManager;
        this.facebookUserDetailsService = facebookUserDetailsService;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        try {
            return getAuthentication(request);
        } catch (UnrecognizedPropertyException property) {
            String msg = "Could not find property " + property.getPropertyName() + " in object model";
            logger.error(msg);
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
        String pathInfo = request.getRequestURI();

        if ( pathInfo.endsWith("/facebook") ) {
            return getFacebookAuthentication(request);
        } else {
            return getNormalAuthentication(request);
        }

    }


    private Authentication getFacebookAuthentication(HttpServletRequest request)
        throws AuthenticationException, IOException
    {
        FacebookAuth facebookAuth = new ObjectMapper().readValue(request.getInputStream(), FacebookAuth.class);

        org.springframework.security.core.userdetails.User user;
        user = facebookUserDetailsService.loadUserByFacebookAuth(facebookAuth);
        if (user != null) {
            Authentication auth = this.getAuthenticationManager().authenticate(
                     new UsernamePasswordAuthenticationToken(
                             user.getUsername(),
                             user.getPassword()
                     )
                    );

            return auth;
        }else {
            throw new BadCredentialsException("Could not verify with Facebook identity");
        }
    }


    private Authentication getNormalAuthentication(HttpServletRequest request)
            throws AuthenticationException, IOException
    {
        User user = new ObjectMapper().readValue(request.getInputStream(), User.class);
        Authentication auth = this.getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                ));
        return auth;
    }

}