package com.api.jee.service;

import com.api.jee.modele.AppRole;

import java.util.List;

public interface RoleService {
    AppRole addNewRole(AppRole appRole);

    List<AppRole> listRoles();

    AppRole findByNom(String nomRole);

}