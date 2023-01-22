package com.api.jee.service.impls;

import com.api.jee.modele.AppRole;
import com.api.jee.repository.AppRoleRepository;
import com.api.jee.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class RoleUserServiceImpl implements RoleService {
    private final AppRoleRepository vRoleRepository;

    public RoleUserServiceImpl(AppRoleRepository vRoleRepository) {
        this.vRoleRepository = vRoleRepository;
    }

    @Override
    public AppRole addNewRole(AppRole appRole) {
        if(vRoleRepository.findByRoleName(appRole.getRoleName()) != null){
            log.warn("Le role existe déjà dans la BDD !");
            return appRole;
        }
        return vRoleRepository.save(appRole);
    }
    @Override
    public List<AppRole> listRoles(){
        return vRoleRepository.findAll();
    }

    @Override
    public AppRole findByNom(String roleName){
        return vRoleRepository.findByRoleName(roleName);
    }

}
