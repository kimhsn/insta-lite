package com.api.jee.repository;

import com.api.jee.modele.Photo;
import com.api.jee.modele.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    Optional<Photo> findByNom(String nom);
    List<Photo> findByOrderByNom();
    List<Photo> findByOrderByCreationData();
}
