package com.api.jee.dto;


import com.api.jee.modele.Photo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PhotoDto {
    private Integer id;
    private String user;
    private String nom;
    private String description;
    private Boolean priver;
    private Boolean cacher;
    private String urlPhoto;
    private Date creationData;

    public static PhotoDto fromEntity(Photo photo){
        if(photo == null){
            return null;
        }
        return PhotoDto.builder()
                .id(photo.getIdPhoto())
                .user(photo.getUser())
                .nom(photo.getNom())
                .description(photo.getDescription())
                .priver(photo.getPriver())
                .cacher(photo.getCacher())
                .urlPhoto(photo.getUrlPhoto())
                .creationData(photo.getCreationData())
                .build();
    }

    public static Photo toEntity(PhotoDto photoDto){
        if(photoDto == null){
            return null;
        }
        Photo vPhoto = new Photo();
        vPhoto.setIdPhoto(photoDto.getId());
        vPhoto.setUser(photoDto.getUser());
        vPhoto.setNom(photoDto.getNom());
        vPhoto.setDescription(photoDto.getDescription());
        vPhoto.setPriver(photoDto.getPriver());
        vPhoto.setCacher(photoDto.getCacher());
        vPhoto.setUrlPhoto(photoDto.getUrlPhoto());
        vPhoto.setCreationData(photoDto.getCreationData());
        return vPhoto;
    }
}
