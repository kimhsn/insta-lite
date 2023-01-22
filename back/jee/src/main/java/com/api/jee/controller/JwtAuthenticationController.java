package com.api.jee.controller;

import com.api.jee.dto.auth.AuthenticationRequest;
import com.api.jee.dto.auth.AuthenticationResponse;
import com.api.jee.service.impls.JwtAuthenticationServiceIpml;
import com.api.jee.utils.JwtUtil;
import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static com.api.jee.utils.Constants.*;

@Api(ENDPOINT_AUTH)
@RestController
@CrossOrigin("*")
@RequestMapping(ENDPOINT_AUTH)
public class JwtAuthenticationController {
    private final JwtAuthenticationServiceIpml vJwtAuthenticationServiceIpml;
    private final JwtUtil vJwtUtil;

    public JwtAuthenticationController(JwtAuthenticationServiceIpml vJwtAuthenticationServiceIpml, JwtUtil vJwtUtil) {
        this.vJwtAuthenticationServiceIpml = vJwtAuthenticationServiceIpml;
        this.vJwtUtil = vJwtUtil;
    }
    @PostMapping(ENDPOINT_AUTHENTICATE)
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
       return vJwtAuthenticationServiceIpml.authenticate(request);
    }
    @GetMapping(ENDPOINT_REFRESH_TOKEN)
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) {
        vJwtAuthenticationServiceIpml.refreshToken(request, response);
    }
    @GetMapping(ENDPOINT_VERIF_TOKEN)
    public boolean isTokenExpired(@RequestParam String token) {
        return vJwtUtil.isTokenExpired(token);
    }
}
