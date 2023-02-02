package com.api.jee.service.impls;

import com.api.jee.dto.AppUserDto;
import com.api.jee.dto.ChangerMdpUserDto;
import com.api.jee.exception.EntityNotFoundException;
import com.api.jee.exception.ErrorCodes;
import com.api.jee.exception.InvalidOperationException;
import com.api.jee.modele.AppRole;
import com.api.jee.modele.AppUser;
import com.api.jee.modele.Photo;
import com.api.jee.repository.AppRoleRepository;
import com.api.jee.repository.AppUserRepository;
import com.api.jee.repository.PhotoRepository;
import com.api.jee.service.AppUserService;
import com.api.jee.validator.UserValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.api.jee.utils.Constants.*;

@Service
@Transactional
@Slf4j
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository vUserRepository;
    private final PasswordEncoder vPasswordEncoder;
    private final PhotoRepository vPhotoRepository;
    private final AppRoleRepository vRoleRepository;

    public AppUserServiceImpl(AppUserRepository vUserRepository, PasswordEncoder vPasswordEncoder,
                              PhotoRepository vPhotoRepository, AppRoleRepository vRoleRepository) {
        this.vUserRepository = vUserRepository;
        this.vPasswordEncoder = vPasswordEncoder;
        this.vPhotoRepository = vPhotoRepository;
        this.vRoleRepository = vRoleRepository;
    }

    private AppUserDto newAbstractUser(AppUserDto user, String role) {
        UserValidator.validate(user);
        user.setMdp(vPasswordEncoder.encode(user.getMdp()));
        AppUserDto.fromEntity(vUserRepository.save(AppUserDto.toEntity(user)));
        addRoleToUser(user.getEmail(), role);
        return user;
    }

    @Override
    public AppUserDto addNewUser(AppUserDto user) {
        return newAbstractUser(user, ROLE_USER);
    }
    @Override
    public AppUserDto addNewManager(AppUserDto user) {
        return newAbstractUser(user, ROLE_MANAGER);

    }
    @Override
    public AppUserDto addNewAdmin(AppUserDto user) {
        return newAbstractUser(user, ROLE_ADMIN);

    }

    @Override
    public List<AppUserDto> read() {
        return vUserRepository.findAll().stream()
                .map(AppUserDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public AppUserDto findById(Integer id){
        if(id == null){
            log.error("ID utilisateur null !");
            return null;
        }
        Optional<AppUser> user = vUserRepository.findById(id);
        return Optional.of(AppUserDto.fromEntity(user.get()))
                .orElseThrow(() -> new EntityNotFoundException
                        ("Aucun utilisateur porte l'ID = "+id+" dans la BDD",
                                ErrorCodes.USER_NOT_FOUND));
    }
    @Override
    public AppUserDto findByEmail(String email){
        if(email == null){
            log.error("Utilisateur mail null !");
            return null;
        }
        AppUserDto vUser = AppUserDto.fromEntity(vUserRepository.findByEmail(email).get());
        if(vUser == null){
            log.warn("Aucun utilisateur n'a été trouvé !");
            throw new EntityNotFoundException("Aucun utlisateur sélectionner !", ErrorCodes.USER_NOT_FOUND);
        }
        return vUser;
    }

    @Override
    public AppUserDto update(Integer id, AppUserDto user) {
        return AppUserDto.fromEntity(vUserRepository.findById(id)
                .map(u-> {
                    u.setNom(user.getNom());
                    u.setPrenom(user.getPrenom());
                    u.setEmail(user.getEmail());
                    u.setDescription(user.getDescription());
                    return vUserRepository.save(AppUserDto.toEntity(AppUserDto.fromEntity(u)));
                }).orElseThrow(() -> new RuntimeException("Utilisateur introvable !")));
    }

    @Override
    public String delete(Integer id) {
        vUserRepository.deleteById(id);
        return "Utilisateur supprimé !";
    }

    @Override
    public AppUserDto ChangeMdp(ChangerMdpUserDto userMpd) throws InvalidOperationException {
        UserValidator.validateChangeMdp(userMpd);
        AppUser vUser = vUserRepository.findByEmail(userMpd.getEmail()).get();
        vUser.setMdp(userMpd.getMdp());
        return AppUserDto.fromEntity(
                vUserRepository.save(vUser)
        );
    }

    @Override
    public List<AppUserDto> pageUsers(int page, int size){
        return vUserRepository.findAll(PageRequest.of(page, size)).getContent().stream()
                .map(AppUserDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public String addRoleToUser(String email, String role) {
        AppUser vAppUser = AppUserDto.toEntity(findByEmail(email));
        AppRole vAppRole = vRoleRepository.findByRoleName(role);
        if(vAppRole == null){
            log.warn("Role introuvable !");
            throw new EntityNotFoundException("Role introuvable !", ErrorCodes.ROLE_NOT_FOUND);
        }
        vAppUser.setAppRoles(vAppRole);
        vUserRepository.save(vAppUser);
        return "Role ajouter avec succés !";
    }

    @Override
    public String addPhotoToUser(String email, Integer idPhoto){
        AppUser vAppUser = AppUserDto.toEntity(findByEmail(email));
        Photo vPhoto = vPhotoRepository.findById(idPhoto).get();
        vPhoto.setUser(vAppUser.getPrenom() + " " + vAppUser.getNom());
        vAppUser.getPhotos().add(vPhoto);
        vUserRepository.save(vAppUser);
        return "Photo ajouter avec succés pour l'utilisateur " + vAppUser.getNom() + " !";
    }

    @Override
    public String addVideoToUser(String email, Integer idVideo){
        AppUser vAppUser = AppUserDto.toEntity(findByEmail(email));
        Photo vPhoto = vPhotoRepository.findById(idVideo).get();
        vAppUser.getPhotos().add(vPhoto);
        vUserRepository.save(vAppUser);
        return "Video ajouter avec succés pour l'utilisateur " + vAppUser.getNom() + " !";
    }

    @Override
    public List<AppUserDto> findByNom(String nom){
        if(nom == null){
            log.error("Nom d'utilisateur null !");
            return null;
        }
        List<AppUserDto> vUser =  vUserRepository.findByNom(nom).stream()
                .map(AppUserDto::fromEntity)
                .collect(Collectors.toList());
        if(nom == null){
            log.warn("Aucun utilisateur n'a été trouvé !");
            throw new EntityNotFoundException("Aucun utlisateur sélectionner !", ErrorCodes.USER_NOT_FOUND);
        }
        return vUser;    }

}
