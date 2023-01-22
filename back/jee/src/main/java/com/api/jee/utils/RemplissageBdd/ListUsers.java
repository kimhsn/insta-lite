package com.api.jee.utils.RemplissageBdd;

import com.api.jee.dto.AppUserDto;
import com.api.jee.modele.AppRole;

import java.util.Arrays;
import java.util.List;

public interface ListUsers {

    public List<AppUserDto> LIST_USERS = Arrays.asList(
            new AppUserDto(null, "user", "user", "user@gmail", "1234", "urlPhotos", null, null, null),
            new AppUserDto(null, "Labiche", "Pierre", "Labiche@gmail", "1234", "urlPhotos", null, null, null),
            new AppUserDto(null, "user1", "user1", "user1@gmail", "1234", "urlPhotos", null, null, null),
            new AppUserDto(null, "user2", "user2", "user2@gmail", "1234", "urlPhotos", null, null, null)
            );
    public List<AppUserDto> LIST_ADMINS = Arrays.asList(
            new AppUserDto(null, "admin1", "admin1", "admin1@gmail", "1234", "urlPhotos", null, null, null),
            new AppUserDto(null, "admin2", "admin2", "admin2@gmail", "1234", "urlPhotos", null, null, null)
    );
    public List<AppRole> LIST_ROLES = Arrays.asList(
            new AppRole(null,"ADMIN"),
            new AppRole(null,"USER")
    );
}
