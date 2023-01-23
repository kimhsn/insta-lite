package com.api.jee.modele;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class AppUser {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer idUser;
    @Column(length = 32)
    private String nom;
    @Column(length = 32)
    private String prenom;
    private String email;
    @JoinColumn(name = "mot_de_passe")
    private String mdp;
    @Column(name = "urlPhoto")
    private String urlPhoto;
    @CreatedDate
    @Column(name = "creationData", nullable = false, updatable = false)
    private Date creationData;
    @OneToOne
    @JoinTable( name = "Users_Roles_Associations",
            joinColumns = @JoinColumn( name = "idUser" ),
            inverseJoinColumns = @JoinColumn( name = "idRole" ) )
    private AppRole appRoles;
    @OneToMany
    @JoinTable( name = "Users_Photos_Associations",
            joinColumns = @JoinColumn( name = "idUser" ),
            inverseJoinColumns = @JoinColumn( name = "idPhoto" ) )
    private List<Photo> photos;
    @OneToMany
    @JoinTable( name = "Users_Video_Associations",
            joinColumns = @JoinColumn( name = "idUser" ),
            inverseJoinColumns = @JoinColumn( name = "idVideo" ) )
    private List<Video> videos;
}
