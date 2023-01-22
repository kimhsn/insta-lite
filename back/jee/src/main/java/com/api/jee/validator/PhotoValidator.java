package com.api.jee.validator;

import com.api.jee.dto.PhotoDto;

import java.util.ArrayList;
import java.util.List;

public class PhotoValidator {
    public static List<String> validate(PhotoDto photoDto){
        List<String> errors = new ArrayList<>();
        if(photoDto.getNom().isEmpty()){
            errors.add("nom vide !");
        }
        return errors;
    }
}
