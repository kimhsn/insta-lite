package com.api.jee.dto;

import com.api.jee.modele.Video;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.api.jee.modele.AppRole;
import com.api.jee.modele.AppUser;
import com.api.jee.modele.Photo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AppUserDto {
    private Integer id;
    private String nom;
    private String prenom;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String mdp;
    private String urlPhoto;
    private AppRole appRoles;
    private List<Photo> photos;
    private List<Video> videos;
    private Date creationData;
    private String description;

    public static AppUserDto fromEntity(AppUser user){
        if(user == null){
            return null;
        }
        return AppUserDto.builder()
                .id(user.getIdUser())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .mdp(user.getMdp())
                .urlPhoto(user.getUrlPhoto())
                .appRoles(user.getAppRoles())
                .photos(user.getPhotos())
                .videos(user.getVideos())
                .creationData(user.getCreationData())
                .description(user.getDescription())
                .build();
    }

    public static AppUser toEntity(AppUserDto userDto){
        if(userDto == null){
            return null;
        }
        AppUser vUser = new AppUser();
        vUser.setIdUser(userDto.getId());
        vUser.setNom(userDto.getNom());
        vUser.setPrenom(userDto.getPrenom());
        vUser.setEmail(userDto.getEmail());
        vUser.setMdp(userDto.getMdp());
        vUser.setUrlPhoto(userDto.getUrlPhoto());
        vUser.setAppRoles(userDto.getAppRoles());
        vUser.setPhotos(userDto.getPhotos());
        vUser.setVideos(userDto.getVideos());
        vUser.setCreationData(userDto.getCreationData());
        vUser.setDescription(userDto.getDescription());
        return vUser;
    }
}
