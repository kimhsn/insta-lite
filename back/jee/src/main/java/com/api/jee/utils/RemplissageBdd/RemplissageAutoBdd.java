package com.api.jee.utils.RemplissageBdd;

import com.api.jee.dto.AppUserDto;
import com.api.jee.dto.PhotoDto;
import com.api.jee.modele.AppRole;
import com.api.jee.service.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.api.jee.utils.RemplissageBdd.ListPhotos.*;
import static com.api.jee.utils.RemplissageBdd.ListUsers.*;

@Configuration
public class RemplissageAutoBdd {
    private final AppUserService vAppUserService;
    private final PhotoService vPhotoService;
    private final RoleService vRoleService;

    public RemplissageAutoBdd(AppUserService vAppUserService, PhotoService vPhotoService,
                              RoleService vRoleService) {
        this.vAppUserService = vAppUserService;
        this.vPhotoService = vPhotoService;
        this.vRoleService = vRoleService;
    }
    @Bean
    public void FillingUpBdd(){
        FillingUpUsers();
        FillingUpPhoto();
    }
    public void FillingUpUsers(){
        for(AppRole r:LIST_ROLES){
            vRoleService.addNewRole(r);
        }
        for(AppUserDto u:LIST_USERS){
            vAppUserService.addNewUser(u);
        }
        for(AppUserDto u:LIST_ADMINS){
            vAppUserService.addNewAdmin(u);
        }
    }

    public void FillingUpPhoto(){
        for(PhotoDto p:LIST_PHOTOS_MANAGER1){
            PhotoDto vPhoto = vPhotoService.create(p);
            vPhotoService.addUserToPhoto("user1@gmail", vPhoto.getId());
            vAppUserService.addPhotoToUser("user1@gmail", vPhoto.getId());
        }
        for(PhotoDto p:LIST_PHOTOS_MANAGER2){
            PhotoDto vPhoto = vPhotoService.create(p);
            vPhotoService.addUserToPhoto("user2@gmail", vPhoto.getId());
            vAppUserService.addPhotoToUser("user2@gmail", vPhoto.getId());
        }
        for(PhotoDto p:LIST_PHOTOS_MANAGER3){
            PhotoDto vPhoto = vPhotoService.create(p);
            vPhotoService.addUserToPhoto("user@gmail", vPhoto.getId());
            vAppUserService.addPhotoToUser("user@gmail", vPhoto.getId());
        }
    }


}
