package com.api.jee.controller;

import com.api.jee.modele.AppRole;
import com.api.jee.service.RoleService;
import io.swagger.annotations.Api;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.api.jee.utils.Constants.*;


@Api(ENDPOINT_ROLE)
@RestController
@CrossOrigin("*")
@RequestMapping(ENDPOINT_ROLE)
public class RoleController {
    private final RoleService vRoleService;
    public RoleController(RoleService vRoleService) {
        this.vRoleService = vRoleService;
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(ENDPOINT_ADD_NEW_ROLE)
    public AppRole addNewRole(@RequestBody AppRole appRole){
        return vRoleService.addNewRole(appRole);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(ENDPOINT_FIND_BY_NOM)
    public AppRole findByNom(@RequestBody String roleName){
        return vRoleService.findByNom(roleName);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping()
    public List<AppRole> read(@RequestBody AppRole appRole){
        return vRoleService.listRoles();
    }
}
