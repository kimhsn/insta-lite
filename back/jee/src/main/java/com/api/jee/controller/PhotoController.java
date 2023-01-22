package com.api.jee.controller;

import com.api.jee.dto.PhotoDto;
import com.api.jee.dto.VideoDto;
import com.api.jee.modele.CreatePhoto;
import com.api.jee.service.PhotoService;
import com.flickr4java.flickr.FlickrException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static com.api.jee.utils.Constants.*;


@Api(ENDPOINT_PHOTOS)
@RestController
@AllArgsConstructor
@CrossOrigin("*")
@RequestMapping(ENDPOINT_PHOTOS)
public class PhotoController {
    private final PhotoService vPhotoService;

    @ApiOperation(value = "Ajouter une Photo.", response = PhotoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Photo ajoutée avec succès."),
            @ApiResponse(code = 400, message = "Photo non valide.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public PhotoDto create(@RequestBody CreatePhoto createPhoto)
            throws FlickrException, IOException, ExecutionException, InterruptedException {
        if(createPhoto.getFile() != null){
            createPhoto.getPhoto().setUrlPhoto(vPhotoService.savePhoto(createPhoto.getFile(),
                    createPhoto.getPhoto().getNom()));
        }
        return vPhotoService.create(PhotoDto.fromEntity(createPhoto.getPhoto()));
    }


    @ApiOperation(value = "Afficher toutes les Photos de la BDD.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des Photos (Peut étre vide)."),
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<PhotoDto> read(){
        return vPhotoService.read();
    }

    @ApiOperation(value = "Mettre à jour une Photo avec son ID.", responseContainer = "List<PhotoDto>")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Photo mise à ajour avec succès."),
            @ApiResponse(code = 400, message = "Photo non valide.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public PhotoDto update(@PathVariable Integer id, @RequestBody PhotoDto Photo){
        return vPhotoService.update(id, Photo);
    }

    @ApiOperation(value = "Supprimer une Photo avec son ID.", response = String.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Photo supprimée avec succès."),
            @ApiResponse(code = 404, message = "Cette Photo ne peut pas étre supprimée.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){
        return vPhotoService.delete(id);
    }

    @ApiOperation(value = "Rechercher un Photo avec son ID.", response = PhotoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Photo trouvée dans la BDD."),
            @ApiResponse(code = 404, message = "Aucun Photo n'a été trouvée dans la BDD.")
    })
    @GetMapping(value = ENDPOINT_FIND_BY_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    PhotoDto findById(@PathVariable Integer id){
        return vPhotoService.findById(id);
    }

    @ApiOperation(value = "Rechercher une Photo avec son NOM.", response = PhotoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Photo trouvée dans la BDD."),
            @ApiResponse(code = 404, message = "Aucune Photo n'a été trouvée dans la BDD.")
    })
    @GetMapping(value = ENDPOINT_FIND_BY_NOM, produces = MediaType.APPLICATION_JSON_VALUE)
    PhotoDto findByNom(@PathVariable String nom){
        return vPhotoService.findByNom(nom);
    }

    @ApiOperation(value = "Ajouter un utilisateur a une photo.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Utilisateur ajouté avec succés."),
            @ApiResponse(code = 404, message = "Aucun utilisateur/photo n'a été trouvé.e dans la BDD.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PostMapping(ENDPOINT_ADD_USER_TO_PHOTO)
    public String addVideoToUser(@RequestBody String emailUser, @RequestBody Integer idPhoto){
        return vPhotoService.addUserToPhoto(emailUser, idPhoto);
    }

}
