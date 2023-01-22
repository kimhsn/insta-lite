package com.api.jee.repository;

import com.api.jee.modele.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppRoleRepository extends JpaRepository<AppRole, Integer>{
    AppRole findByRoleName(String roleName);
}
