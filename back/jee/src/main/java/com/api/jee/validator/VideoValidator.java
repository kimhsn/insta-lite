package com.api.jee.validator;

import com.api.jee.dto.VideoDto;

import java.util.ArrayList;
import java.util.List;

public class VideoValidator {
    public static List<String> validate(VideoDto videoDto){
        List<String> errors = new ArrayList<>();
        if(videoDto.getNom().isEmpty()){
            errors.add("nom vide !");
        }
        return errors;
    }
}
