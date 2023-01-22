package com.api.jee.dto;

import com.api.jee.modele.Video;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoDto {
    private Integer id;
    private String nom;
    private String user;
    private String description;
    private Boolean priver;
    private Boolean cacher;
    private String urlVideo;
    private Date creationData;

    public static VideoDto fromEntity(Video video){
        if(video == null){
            return null;
        }
        return VideoDto.builder()
                .id(video.getIdVideo())
                .user(video.getUser())
                .nom(video.getNom())
                .description(video.getDescription())
                .priver(video.getPriver())
                .cacher(video.getCacher())
                .urlVideo(video.getUrlVideo())
                .creationData(video.getCreationData())
                .build();
    }

    public static Video toEntity(VideoDto videoDto){
        if(videoDto == null){
            return null;
        }
        Video vVideo = new Video();
        vVideo.setIdVideo(videoDto.getId());
        vVideo.setUser(videoDto.getUser());
        vVideo.setNom(videoDto.getNom());
        vVideo.setDescription(videoDto.getDescription());
        vVideo.setPriver(videoDto.getPriver());
        vVideo.setCacher(videoDto.getCacher());
        vVideo.setUrlVideo(videoDto.getUrlVideo());
        vVideo.setCreationData(videoDto.getCreationData());
        return vVideo;
    }
}
