package com.api.jee.service.auth;

import com.api.jee.dto.AppUserDto;
import com.api.jee.exception.EntityNotFoundException;
import com.api.jee.exception.ErrorCodes;
import com.api.jee.repository.AppUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class AppUserDetailsService implements UserDetailsService {
    private final AppUserRepository vUserRepository;

    public AppUserDetailsService(AppUserRepository vUserRepository) {
        this.vUserRepository = vUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        try{
            AppUserDto vUser = AppUserDto.fromEntity(vUserRepository.findByEmail(email).get());
            List<SimpleGrantedAuthority> vAuthorityList = new ArrayList<>();
            vAuthorityList.add(new SimpleGrantedAuthority(vUser.getAppRoles().getRoleName()));
            return new User(vUser.getEmail(), vUser.getMdp(), vAuthorityList);
        } catch (Exception e) {
            log.warn("Aucun utilisateur n'a été trouvé !");
            throw new EntityNotFoundException("Aucun utlisateur n'a été trouvé dans la BDD !", e, ErrorCodes.USER_NOT_FOUND);
        }
    }
}
