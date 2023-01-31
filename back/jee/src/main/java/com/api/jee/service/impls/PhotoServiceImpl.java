package com.api.jee.service.impls;

import com.api.jee.dto.PhotoDto;
import com.api.jee.exception.EntityNotFoundException;
import com.api.jee.exception.ErrorCodes;
import com.api.jee.exception.InvalideEntityException;
import com.api.jee.modele.AppUser;
import com.api.jee.modele.Photo;
import com.api.jee.repository.AppUserRepository;
import com.api.jee.repository.PhotoRepository;
import com.api.jee.validator.PhotoValidator;
import com.flickr4java.flickr.Flickr;
import com.flickr4java.flickr.FlickrException;
import com.flickr4java.flickr.uploader.UploadMetaData;
import com.api.jee.config.FlickrConfigurationConnect;
import com.api.jee.service.PhotoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j

public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository vPhotoRepository;
    private final AppUserRepository vUserRepository;

    public PhotoServiceImpl(PhotoRepository vPhotoRepository, AppUserRepository vUserRepository) {
        this.vPhotoRepository = vPhotoRepository;
        this.vUserRepository = vUserRepository;
    }


    @Override
    public PhotoDto create(PhotoDto photo) {
        List<String> errors = PhotoValidator.validate(photo);
        if(errors.size() > 0){
            log.error("Photo non valide !", photo);
            throw new InvalideEntityException("La Photo n'est pas valide !", ErrorCodes.PHOTO_NOT_VALIDE, errors);
        }
        return PhotoDto.fromEntity(vPhotoRepository.save(PhotoDto.toEntity(photo)));
    }

    @Override
    public List<PhotoDto> read() {
        return vPhotoRepository.findAll().stream()
                .map(PhotoDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public PhotoDto findById(Integer id){
        if(id == null){
            log.error("Photo ID null !");
            return null;
        }
        Optional<Photo> Photo = vPhotoRepository.findById(id);
        return Optional.of(PhotoDto.fromEntity(Photo.get()))
                .orElseThrow(() -> new EntityNotFoundException
                        ("Aucune Photo porte l'ID = "+id+" dans la BDD",
                                ErrorCodes.PHOTO_NOT_FOUND));
    }

    @Override
    public PhotoDto findByNom(String nom){
        if(nom.isEmpty()){
            log.error("Nom de la Photo null !");
            return null;
        }
        Optional<Photo> Photo = vPhotoRepository.findByNom(nom);
        return Optional.of(PhotoDto.fromEntity(Photo.get()))
                .orElseThrow(() -> new EntityNotFoundException
                        ("Aucune Photo porte le nom = "+nom+" dans la BDD",
                                ErrorCodes.PHOTO_NOT_FOUND));
    }

    @Override
    public PhotoDto update(Integer id, PhotoDto photo) {
        return PhotoDto.fromEntity(vPhotoRepository.findById(id)
                .map(p-> {
                    p.setNom(photo.getNom());
                    p.setDescription(photo.getDescription());
                    p.setCacher(photo.getCacher());
                    p.setPriver(photo.getPriver());
                    p.setUrlPhoto(photo.getUrlPhoto());
                    return vPhotoRepository.save(PhotoDto.toEntity(PhotoDto.fromEntity(p)));
                }).orElseThrow(() -> new RuntimeException("Photo introvable !")));
    }

    @Override
    public String delete(Integer id) {
        vPhotoRepository.deleteById(id);
        return "Photo supprimé !";
    }

    @Override
    public String savePhoto(String file, String titre) throws FlickrException, IOException {
        final FlickrConfigurationConnect flickrConf = new FlickrConfigurationConnect();
        final Flickr flickr = flickrConf.getCnxFlickr();
        InputStream stream = new FileInputStream(new File(file));
        UploadMetaData uploadMetaData = new UploadMetaData();
        uploadMetaData.setTitle(titre);
        String vPhotoId = flickr.getUploader().upload(stream, uploadMetaData);
        return flickr.getPhotosInterface().getPhoto(vPhotoId).getMedium640Url();
    }

    @Override
    public String savePhotos(MultipartFile file, String titre) throws FlickrException, IOException {
        final FlickrConfigurationConnect flickrConf = new FlickrConfigurationConnect();
        final Flickr flickr = flickrConf.getCnxFlickr();
        InputStream stream = file.getInputStream();
        UploadMetaData uploadMetaData = new UploadMetaData();
        uploadMetaData.setTitle(titre);
        String vPhotoId = flickr.getUploader().upload(stream, uploadMetaData);
        return flickr.getPhotosInterface().getPhoto(vPhotoId).getMedium640Url();
    }

    @Override
    public String addUserToPhoto(String emailUser, Integer idPhoto){
        Photo vPhoto = PhotoDto.toEntity(findById(idPhoto));
        AppUser vUser = vUserRepository.findByEmail(emailUser).get();
        vPhoto.setUser(vUser.getPrenom()+" "+vUser.getNom());
        vPhotoRepository.save(vPhoto);
        return "Utilisateur ajouté avec succés pour la boutique " + vPhoto.getNom() + " !";
    }

}
