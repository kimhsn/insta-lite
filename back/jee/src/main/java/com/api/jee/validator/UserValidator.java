package com.api.jee.validator;

import com.api.jee.dto.AppUserDto;
import com.api.jee.dto.ChangerMdpUserDto;
import com.api.jee.exception.ErrorCodes;
import com.api.jee.exception.InvalidOperationException;
import com.api.jee.exception.InvalideEntityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class UserValidator {
    public static void validate(AppUserDto userDto){
        List<String> errors = new ArrayList<>();
        if(!StringUtils.hasLength(userDto.getNom())){
            errors.add("Nom vide !");
        }
        if(errors.size() > 0){
            log.error("Utilsateur non valide !", userDto);
            throw new InvalideEntityException("L'utilisateur n'est pas valide !", ErrorCodes.USER_NOT_FOUND, errors);
        }
    }
    public static void validateChangeMdp(ChangerMdpUserDto userMpd) throws InvalidOperationException {
        if(userMpd == null){
            log.warn("Changement de mot de passe impossible !");
            throw new InvalidOperationException("Aucun utlisateur sélectionner !", ErrorCodes.USER_CHANGE_MDP_OBJECT_NOT_VALIDE);
        }
        if(!StringUtils.hasLength(userMpd.getEmail())){
            log.warn("Aucun utilisateur n'a été trouver dans la BDD avec l'email "+userMpd.getEmail());
            throw new InvalideEntityException("Utilisatur introuvable !", ErrorCodes.USER_NOT_FOUND);
        }
        if (!StringUtils.hasLength(userMpd.getConfirmationMpd())){
            log.warn("Changement de mot de passe impossible ! : mot de passe non valide");
            throw new InvalidOperationException("Mot de passe non valide ", ErrorCodes.MDP_NOT_VALIDE);
        }
        if (!StringUtils.hasLength(userMpd.getMdp())){
            log.warn("Changement de mot de passe impossible ! : les deux mot de passe sont différent");
            throw new InvalidOperationException("Les deux mot de passe sont différent", ErrorCodes.MDP_NOT_EQUAL);
        }
    }

}
