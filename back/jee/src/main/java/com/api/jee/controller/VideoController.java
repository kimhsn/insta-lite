package com.api.jee.controller;

import com.api.jee.dto.VideoDto;
import com.api.jee.service.VideoService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.api.jee.utils.Constants.*;

@Api(ENDPOINT_VIDEOS)
@RestController
@CrossOrigin("*")
@AllArgsConstructor
@RequestMapping(ENDPOINT_VIDEOS)
public class VideoController {

    private final VideoService vVideoService;

    @ApiOperation(value = "Ajouter un Video.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Video ajouté avec succès."),
            @ApiResponse(code = 400, message = "Video non valide.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public VideoDto create(@RequestBody VideoDto video){
        return vVideoService.create(video);
    }

    @ApiOperation(value = "Afficher tous les Video de la BDD.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des Videos (Peut étre vide)."),
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<VideoDto> read(){
        return vVideoService.read();
    }

    @ApiOperation(value = "Mettre à jour un Video avec son ID.", responseContainer = "List<VideoDto>")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Video mis à ajour avec succès."),
            @ApiResponse(code = 400, message = "Video non valide.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public VideoDto update(@PathVariable Integer id, @RequestBody VideoDto Video){
        return vVideoService.update(id, Video);
    }

    @ApiOperation(value = "Supprimer un Video avec son ID.", response = String.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Video supprimé avec succès."),
            @ApiResponse(code = 404, message = "Ce Video ne peut pas étre supprimé.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @DeleteMapping(value = "/{id}")
    public String delete(@PathVariable Integer id){
        return vVideoService.delete(id);
    }

    @ApiOperation(value = "Rechercher un Video avec son ID.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Video trouvé dans la BDD."),
            @ApiResponse(code = 404, message = "Aucun Video n'a été trouvé dans la BDD.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping(value = ENDPOINT_FIND_BY_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    VideoDto findById(@PathVariable Integer id){
        return vVideoService.findById(id);
    }

    @ApiOperation(value = "Rechercher un Video avec son NOM.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Video trouvé dans la BDD."),
            @ApiResponse(code = 404, message = "Aucun Video n'a été trouvé dans la BDD.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping(value = ENDPOINT_FIND_BY_NOM, produces = MediaType.APPLICATION_JSON_VALUE)
    public VideoDto findByNom(@PathVariable String nom){
        return vVideoService.findByNom(nom);
    }
}
