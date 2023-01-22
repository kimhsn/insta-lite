package com.api.jee.modele;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity
@EqualsAndHashCode(callSuper = true)
public class Video extends AbstractEntity {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer idVideo;
    @Column(name = "urlVideo")
    private String urlVideo;
}
