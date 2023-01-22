package com.api.jee.service.impls;

import com.api.jee.dto.VideoDto;
import com.api.jee.exception.EntityNotFoundException;
import com.api.jee.exception.ErrorCodes;
import com.api.jee.exception.InvalideEntityException;
import com.api.jee.modele.AppUser;
import com.api.jee.modele.Video;
import com.api.jee.repository.AppUserRepository;
import com.api.jee.repository.VideoRepository;
import com.api.jee.service.VideoService;
import com.api.jee.validator.VideoValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class VideoServiceImpl implements VideoService {

    private final VideoRepository vVideoRepository;
    private final AppUserRepository vUserRepository;

    public VideoServiceImpl(VideoRepository vVideoRepository, AppUserRepository vUserRepository) {
        this.vVideoRepository = vVideoRepository;
        this.vUserRepository = vUserRepository;
    }


    @Override
    public VideoDto create(VideoDto video) {
        List<String> errors = VideoValidator.validate(video);
        if(errors.size() > 0){
            log.error("video non valide !", video);
            throw new InvalideEntityException("Le format de la video n'est pas valide !", ErrorCodes.VIDEO_NOT_VALIDE, errors);
        }
        return VideoDto.fromEntity(vVideoRepository.save(VideoDto.toEntity(video)));
    }

    public VideoDto findById(Integer id){
        if(id == null){
            log.error("video ID null !");
            return null;
        }
        Optional<Video> video = vVideoRepository.findById(id);
        return Optional.of(VideoDto.fromEntity(video.get()))
                .orElseThrow(() -> new EntityNotFoundException
                ("Aucunne video porte l'ID = "+id+" dans la BDD",
                        ErrorCodes.VIDEO_NOT_FOUND));
    }

    public VideoDto findByNom(String nom){
        if(nom.isEmpty()){
            log.error("Code video null !");
            return null;
        }
        Optional<Video> video = vVideoRepository.findByNom(nom);
        return Optional.of(VideoDto.fromEntity(video.get()))
                .orElseThrow(() -> new EntityNotFoundException
                        ("Aucunne video porte le code = "+nom+" dans la BDD",
                                ErrorCodes.VIDEO_NOT_FOUND));
    }

    @Override
    public List<VideoDto> read() {
        return vVideoRepository.findAll().stream()
                .map(VideoDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public VideoDto update(Integer id, VideoDto video) {
        return VideoDto.fromEntity(vVideoRepository.findById(id)
                .map(v-> {
                    v.setNom(video.getNom());
                    v.setDescription(video.getDescription());
                    v.setCacher(video.getCacher());
                    v.setPriver(video.getPriver());
                    return vVideoRepository.save(VideoDto.toEntity(VideoDto.fromEntity(v)));
                })
                .orElseThrow(() -> new RuntimeException("video introvable !")));
    }

    @Override
    public String delete(Integer id) {
        if(id == null){
            log.error("video ID null !");
            return null;
        }
        vVideoRepository.deleteById(id);
        return "video supprimée !";
    }

    @Override
    public String addUserToVideo(String emailUser, Integer idVideo){
        Video vVideo = VideoDto.toEntity(findById(idVideo));
        AppUser vUser = vUserRepository.findByEmail(emailUser).get();
        vVideo.setUser(vUser.getPrenom()+" "+vUser.getNom());
        vVideoRepository.save(vVideo);
        return "Utilisateur ajouté avec succés pour la boutique " + vVideo.getNom() + " !";
    }
}
