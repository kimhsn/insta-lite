package com.api.jee.modele;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Photo extends AbstractEntity{
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer idPhoto;
    @Column(name = "urlPhoto")
    private String urlPhoto;
}
