package com.api.jee.service;

import com.api.jee.dto.PhotoDto;
import com.api.jee.modele.Photo;
import com.flickr4java.flickr.FlickrException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.util.List;
import java.util.concurrent.ExecutionException;

public interface PhotoService {
    PhotoDto create(PhotoDto photo);
    List<PhotoDto> read();
    PhotoDto findById(Integer id);
    PhotoDto findByNom(String nom);
    PhotoDto update(Integer id, PhotoDto photo);
    String delete(Integer id);
    String addUserToPhoto(String emailUser, Integer idPhoto);
    String savePhoto(MultipartFile file, String titre) throws FlickrException, IOException, ExecutionException, InterruptedException;
}
