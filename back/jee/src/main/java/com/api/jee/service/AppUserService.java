package com.api.jee.service;

import com.api.jee.dto.AppUserDto;
import com.api.jee.dto.ChangerMdpUserDto;
import com.api.jee.exception.InvalidOperationException;

import java.util.List;

public interface AppUserService {
    AppUserDto addNewManager(AppUserDto user);

    AppUserDto addNewUser(AppUserDto user);

    AppUserDto addNewAdmin(AppUserDto user);

    List<AppUserDto> read();

    List<AppUserDto> findByNom(String nom);

    AppUserDto findById(Integer id);

    AppUserDto findByEmail(String mail);

    AppUserDto update(Integer id, AppUserDto user);

    String delete(Integer id);

    AppUserDto ChangeMdp(ChangerMdpUserDto User) throws InvalidOperationException;

    String addRoleToUser(String email, String role);

    String addPhotoToUser(String email, Integer idPhoto);
    String addVideoToUser(String email, Integer idVideo);

    List<AppUserDto> pageUsers(int page, int size);
}