package com.api.jee.service;

import com.api.jee.dto.auth.AuthenticationRequest;
import com.api.jee.dto.auth.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface JwtAuthenticationService {
    void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException;
    ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request);
}
