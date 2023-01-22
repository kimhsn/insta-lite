package com.api.jee.modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.time.Instant;
import java.util.Date;


@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class AbstractEntity implements Serializable {
    @Column(name = "user")
    private String user;
    @Column(name = "nom", nullable = false, length = 32)
    private String nom;
    @Column(name = "description")
    private String description;
    @Column(name = "priver")
    private Boolean priver;
    @Column(name = "cacher")
    private Boolean cacher;
    @CreatedDate
    @Column(name = "creationData", nullable = false, updatable = false)
    private Date creationData;
    @LastModifiedDate
    @Column(name = "lastModifiedData")
    @JsonIgnore
    private Instant lastModifiedData;

}

