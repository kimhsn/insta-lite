package com.api.jee.modele;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleUserFrom {
    private String email;
    private String roleName;
}
