package com.api.jee.service;

import com.api.jee.dto.VideoDto;

import java.util.List;

public interface VideoService {
    VideoDto create(VideoDto produit);
    VideoDto findById(Integer id);
    List<VideoDto> read();
    VideoDto update(Integer id, VideoDto produit);
    String delete(Integer id);
    VideoDto findByNom(String nom);
    String addUserToVideo(String emailUser, Integer idVideo);
}
