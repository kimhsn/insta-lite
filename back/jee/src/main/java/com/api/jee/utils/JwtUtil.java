package com.api.jee.utils;


import com.api.jee.dto.auth.AuthenticationResponse;
import io.jsonwebtoken.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.api.jee.utils.Constants.*;

@Service
public class JwtUtil {

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public Collection<GrantedAuthority> extractRoles(String token) {
        ArrayList roles = (ArrayList) extractAllClaims(token).get(ROLES);
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        if(roles == null) {
            throw new RuntimeException("Le token de l'utilisateur ne dispose d'aucun role !");
        } else {
            for(Object r:roles){ authorities.add(new SimpleGrantedAuthority(r.toString())); }
        }
        return authorities;
    }
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public AuthenticationResponse generateIdToken(UserDetails userDetails) {
        AuthenticationResponse vIdToken = new AuthenticationResponse();
        vIdToken.setAccesToken(generateToken(userDetails));
        vIdToken.setRefreshToken(generateRefreshToken(userDetails));
        return vIdToken;
    }

    public AuthenticationResponse refreshToken(UserDetails userDetails, String refreshToken) {
        final AuthenticationResponse vIdToken = new AuthenticationResponse();
        vIdToken.setAccesToken(generateToken(userDetails));
        vIdToken.setRefreshToken(refreshToken);
        return vIdToken;
    }

    private String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put(ROLES,
                userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        return createToken(claims, userDetails.getUsername(), EXPIRE_ACCESS_TOKEN);
    }

    private String generateRefreshToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername(), EXPIRE_REFRESH_TOKEN);
    }

    private String createToken(Map<String, Object> claims, String subject, Long expireToken) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireToken))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public void validateJwtToken(String token) {
        try{
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
        } catch (Exception e){
            throw new RuntimeException("Token not valid !");
        }
    }

    public Map<String, String> validateHeader(HttpServletRequest request) {
        final String vAuthToken = request.getHeader(AUTHORIZATION_HEADER);
        if(StringUtils.hasLength(vAuthToken)) {
            if (vAuthToken.startsWith(PREFIX_TOKEN)) {
                String authToken = vAuthToken.substring(PREFIX_TOKEN.length());
                validateJwtToken(authToken);
                String username = extractUsername(authToken);
                final Map<String, String> detailToken = new HashMap<>();
                detailToken.put("authToken", authToken);
                detailToken.put("username", username);
                return detailToken;
            } else {
                throw new RuntimeException("Bearer required !");
            }
        }
        throw new RuntimeException("Token required !");
    }

}