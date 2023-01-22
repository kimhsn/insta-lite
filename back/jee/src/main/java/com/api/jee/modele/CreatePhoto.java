package com.api.jee.modele;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.InputStream;

@Data
@AllArgsConstructor
public class CreatePhoto {
    private Photo photo;
    private File file;
}
