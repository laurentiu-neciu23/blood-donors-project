package com.mps.blooddonors.security;

import static com.mps.blooddonors.security.SecurityConstants.*;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {
    
    public JWTAuthorizationFilter(AuthenticationManager authManager) {
        super(authManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse resp,
                                    FilterChain chain) throws IOException, ServletException {

        String authToken = req.getHeader(HEADER_STRING);

        // The protocol specifies that the if the Authorization does 
        // not exists or does not start with the Bearer string, it passes
        // to the remaining chain to decide the authorization

        if(authToken == null || !authToken.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(req, resp);
            return;
        }

        UsernamePasswordAuthenticationToken jwtToken = decodeJWT(req);
        SecurityContextHolder.getContext().setAuthentication(jwtToken);
        chain.doFilter(req, resp);
    } 

    private UsernamePasswordAuthenticationToken decodeJWT(HttpServletRequest req) {
        
        String authToken = req.getHeader(HEADER_STRING);

        String subject = JWT.require(Algorithm.HMAC256(SECRET.getBytes()))
                            .build()
                            .verify(authToken.replace(TOKEN_PREFIX, ""))
                            .getSubject();
        if (subject != null) {
            return new UsernamePasswordAuthenticationToken(subject, null, new ArrayList<>());
        }

        return null;
    }
    

}