package com.api.jee.config;

import com.api.jee.config.filter.JwtAuthorizationFilter;
import com.api.jee.service.auth.AppUserDetailsService;
import com.api.jee.utils.JwtUtil;
import io.swagger.models.HttpMethod;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.api.jee.utils.Constants.*;


@EnableWebSecurity
@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil vJwtUtil;

    public SecurityConfiguration(AppUserDetailsService appUserDetailsService, JwtUtil vJwtUtil) {
        this.appUserDetailsService = appUserDetailsService;
        this.vJwtUtil = vJwtUtil;
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(appUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        /*http.authorizeRequests()
                .antMatchers(String.valueOf(HttpMethod.GET), ENDPOINT_PHOTOS).permitAll()
                .antMatchers(String.valueOf(HttpMethod.GET), ENDPOINT_VIDEOS).permitAll()
                .antMatchers(ROOT_AUTHORIZED.toArray(new String[ROOT_AUTHORIZED.size()])).permitAll()
                .antMatchers(ROOT_AUTHORIZED_ADMIN).hasAuthority("ADMIN")
                .antMatchers(ROOT_AUTHORIZED_USER).hasAuthority("USER");*/

        http.csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and();
        http.addFilterBefore(new JwtAuthorizationFilter(vJwtUtil),
                UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}
