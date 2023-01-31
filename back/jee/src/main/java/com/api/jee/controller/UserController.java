package com.api.jee.controller;

import com.api.jee.dto.AppUserDto;
import com.api.jee.dto.PhotoDto;
import com.api.jee.dto.VideoDto;
import com.api.jee.modele.RoleUserFrom;
import com.api.jee.service.AppUserService;
import io.swagger.annotations.*;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

import static com.api.jee.utils.Constants.*;

@Api(ENDPOINT_USERS)
@RestController
@CrossOrigin("*")
@RequestMapping(ENDPOINT_USERS)
public class UserController {
    private final AppUserService vUserService;

    public UserController(AppUserService vUserService) {
        this.vUserService = vUserService;
    }

    @ApiOperation(value = "Ajouter un utilisateur USER.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "utilisateur ajouté avec succès."),
            @ApiResponse(code = 400, message = "utilisateur non valide.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PostMapping(ENDPOINT_ADD_USER)
    public AppUserDto addNewUser(@RequestBody AppUserDto user){
        return vUserService.addNewUser(user);
    }

    @ApiOperation(value = "Ajouter un utilisateur ADMIN.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "utilisateur ajouté avec succès."),
            @ApiResponse(code = 400, message = "utilisateur non valide.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(ENDPOINT_ADD_ADMIN)
    public AppUserDto addNewAdmin(@RequestBody AppUserDto user){
        return vUserService.addNewAdmin(user);
    }

    @ApiOperation(value = "Afficher tous les utilisateurs de la BDD.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des utilisateurs (Peut étre vide)."),
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping()
    public List<AppUserDto> read(){
        return vUserService.read();
    }

    @ApiOperation(value = "Mettre à jour un utilisateur avec son ID.", responseContainer = "List<UserDto>")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "utilisateur mis à ajour avec succès."),
            @ApiResponse(code = 400, message = "utilisateur non valide.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PutMapping("/{id}")
    public AppUserDto update(@PathVariable Integer id, @RequestBody AppUserDto user){
        return vUserService.update(id, user);
    }

    @ApiOperation(value = "Supprimer un utilisateur avec son ID.", response = String.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "utilisateur supprimé avec succès."),
            @ApiResponse(code = 404, message = "Cette utilisateur ne peut pas étre supprimé.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){return vUserService.delete(id);}

    @ApiOperation(value = "Rechercher un utilisateur avec son MAIL.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "utilisateur trouvé dans la BDD."),
            @ApiResponse(code = 403, message = "Autorisations manquantes."),
            @ApiResponse(code = 404, message = "Aucun utilisateur n'a été trouvé dans la BDD.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = ENDPOINT_FIND_BY_EMAIL, produces = MediaType.APPLICATION_JSON_VALUE)
    AppUserDto findByEmail(@PathVariable String email){
        return vUserService.findByEmail(email);
    }

    @ApiOperation(value = "Rechercher un utilisateur avec son ID.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "utilisateur trouvé dans la BDD."),
            @ApiResponse(code = 404, message = "Aucun utilisateur n'a été trouvé dans la BDD.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = ENDPOINT_FIND_BY_ID, produces = MediaType.APPLICATION_JSON_VALUE)
    AppUserDto findById(@PathVariable Integer id){
        return vUserService.findById(id);
    }

    @ApiOperation(value = "Ajouter un role a un utilisateur.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Role ajouté avec succés."),
            @ApiResponse(code = 404, message = "Aucun utilisateur/role n'a été trouvé dans la BDD.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(ENDPOINT_ADD_ROLE_TO_USER)
    public String addRoleToUser(@RequestBody RoleUserFrom roleUserFrom){
        return vUserService.addRoleToUser(roleUserFrom.getEmail(), roleUserFrom.getRoleName());
    }

    @ApiOperation(value = "Afficher tous les utilisateurs de la BDD avec pagination.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "La liste des utilisateurs (Peut étre vide)."),
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(ENDPOINT_PAGE_USER)
    public List<AppUserDto> pageUsers(@RequestParam(name="page", defaultValue = "0") int page,
                                       @RequestParam(name="size", defaultValue = "6") int size){
        return vUserService.pageUsers(page, size);
    }

    @ApiOperation(value = "Consulter le profile de l'utilisateur courant.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Profile Utilisateur."),
            @ApiResponse(code = 404, message = "Profile Indisponible.")
    })
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @GetMapping(ENDPOINT_PROFILE_USER)
    public AppUserDto profileUser(Principal principal){
        return vUserService.findByEmail(principal.getName());
    }

    @ApiOperation(value = "Ajouter une photo a un utilisateur.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "photo ajoutée avec succés."),
            @ApiResponse(code = 404, message = "Aucun utilisateur/photo n'a été trouvé.e dans la BDD.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(ENDPOINT_ADD_PHOTO_TO_USER)
    public String addPhotoToUser(@RequestBody String emailUser, @RequestBody Integer idPhoto){
        return vUserService.addPhotoToUser(emailUser, idPhoto);
    }

    @ApiOperation(value = "Ajouter une Video a un utilisateur.", response = VideoDto.class)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Video ajoutée avec succés."),
            @ApiResponse(code = 404, message = "Aucun utilisateur/video n'a été trouvé.e dans la BDD.")
    })
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(ENDPOINT_ADD_VIDEO_TO_USER)
    public String addVideoToUser(@RequestBody String emailUser, @RequestBody Integer idVideo){
        return vUserService.addVideoToUser(emailUser, idVideo);
    }
}
