package com.api.jee.repository;

import com.api.jee.modele.Photo;
import com.api.jee.modele.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Integer> {
    Optional<Video> findByNom(String nom);
    List<Photo> findByOrderByNom();

    List<Photo> findByOrderByCreationData();

}
