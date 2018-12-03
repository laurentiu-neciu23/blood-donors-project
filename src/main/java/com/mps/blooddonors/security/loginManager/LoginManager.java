package com.mps.blooddonors.security.loginManager;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mps.blooddonors.service.AbstractLoginService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

public class LoginManager {

    private HttpServletRequest request;


    private AbstractLoginService loginService;
    private Class klass;
    private AuthenticationManager authenticationManager;


    public LoginManager(HttpServletRequest request, AbstractLoginService loginService,
                        Class klass, AuthenticationManager authenticationManager) {
        this.request = request;
        this.loginService = loginService;
        this.klass = klass;
        this.authenticationManager = authenticationManager;
    }

    public Authentication getAuthentication()
            throws AuthenticationException, IOException
    {
        Object o = new ObjectMapper().readValue(request.getInputStream(), klass);
        User user = loginService.login(o);
        if (user != null) {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(),
                            user.getPassword()
                    )
            );

            return auth;
        }else {
            throw new BadCredentialsException("Could not find user with given identity.");
        }

    }


}
