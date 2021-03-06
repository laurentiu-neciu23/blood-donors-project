package com.mps.blooddonors.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.context.annotation.Bean;

import static com.mps.blooddonors.security.SecurityConstants.SIGN_UP_URL;
import static com.mps.blooddonors.security.SecurityConstants.DEBUG_URL;

import com.mps.blooddonors.service.UserDetailsServiceImpl;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.lang.reflect.Array;
import java.util.Arrays;

@EnableWebSecurity
@Configuration
@Order(1)
public class UserPasswordWebSecurity extends WebSecurityConfigurerAdapter {

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private UserDetailsServiceImpl userDetailsServiceImpl;

    @Autowired @Lazy
    private JWTAuthenticationFilter jwtAuthenticationFilter;

    @Autowired @Lazy
    private JWTAuthorizationFilter jwtAuthorizationFilter;

    public UserPasswordWebSecurity(BCryptPasswordEncoder bCryptPasswordEncoder,
                       UserDetailsServiceImpl userDetailsServiceImpl) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .headers().cacheControl().disable().and()
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
                .antMatchers(HttpMethod.POST, "/login/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/login/**").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/users/**").permitAll()
                .antMatchers("/console/**").permitAll()
                .antMatchers(HttpMethod.POST, DEBUG_URL).permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(jwtAuthenticationFilter)
                .addFilter(jwtAuthorizationFilter)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImpl)
            .passwordEncoder(bCryptPasswordEncoder);
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setMaxAge((long)3600);
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    JWTAuthenticationFilter jwtAuthenticationFilter(AuthenticationManager auth){
        JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter(auth);
        jwtAuthenticationFilter.setFilterProcessesUrl("/login/**");
        return jwtAuthenticationFilter;
    }

    @Bean
    JWTAuthorizationFilter jwtAuthorizationFilter(AuthenticationManager auth) throws  Exception{
        JWTAuthorizationFilter jwtAuthorizationFilter = new JWTAuthorizationFilter(auth);
        return jwtAuthorizationFilter;
    }


    @Bean
    AuthenticationManager auth() throws Exception{
        return super.authenticationManagerBean();
    }


}
