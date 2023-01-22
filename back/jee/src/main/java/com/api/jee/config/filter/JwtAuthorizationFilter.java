package com.api.jee.config.filter;

import com.api.jee.utils.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

import static com.api.jee.utils.Constants.*;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtUtil vJwtUtil;

    public JwtAuthorizationFilter(JwtUtil vJwtUtil) {
        this.vJwtUtil = vJwtUtil;

    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if(Arrays.asList(ROOT_AUTHORIZED).contains(request.getServletPath())
        ){
            filterChain.doFilter(request, response);
        } else {
            final String vAuthHeader = request.getHeader(AUTHORIZATION_HEADER);
            if(StringUtils.hasLength(vAuthHeader)){
                if(vAuthHeader.startsWith(PREFIX_TOKEN)) {
                    String vJwt = vAuthHeader.substring(7);
                    vJwtUtil.validateJwtToken(vJwt);
                    String vUserEmail = vJwtUtil.extractUsername(vJwt);
                    if(StringUtils.hasLength(vUserEmail) && SecurityContextHolder.getContext().getAuthentication() == null){
                        UsernamePasswordAuthenticationToken vUsernamePasswordAuthenticationToken =
                                new UsernamePasswordAuthenticationToken(
                                vUserEmail, null, vJwtUtil.extractRoles(vJwt)
                        );
                        vUsernamePasswordAuthenticationToken.setDetails(
                                new WebAuthenticationDetailsSource().buildDetails(request)
                        );
                        SecurityContextHolder.getContext().setAuthentication(vUsernamePasswordAuthenticationToken);
                    }
                }
            }
            filterChain.doFilter(request, response);
        }
    }
}

