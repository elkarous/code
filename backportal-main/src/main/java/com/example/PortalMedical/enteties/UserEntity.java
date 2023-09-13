package com.example.PortalMedical.enteties;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.*;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity implements Serializable {
	private static final long serialVersionUID = 1L;
@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String nom;
    private String prenom;
    private Date age ;
    private String cin ; 
    @Enumerated(EnumType.STRING)
    private Role role ;
    private String email;
    @Enumerated(EnumType.STRING)
    private Sexe sexe;
    private String pays;
    @Enumerated(EnumType.STRING)
    private Gouvernerats gouvernerat;
    private int codepostal;
    private String ville;
    @Column(nullable = true)
    private String password;
    private Date creationDate;
    private String numtelephone;

    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "id")
    @OneToOne
    private UserEntity directeur  ;
    @JsonBackReference(value="equipe")
    @ManyToOne
    private Equipe equipe;
    @JsonManagedReference(value = "chef")
    @OneToMany( mappedBy = "chef",fetch=FetchType.LAZY)
    private Collection<Projet> projets ;
    @JsonManagedReference(value="personne")
    @OneToMany(mappedBy = "personne", fetch=FetchType.LAZY)
    private Collection<JournalisationT> journalisationT ;

    @JsonManagedReference(value = "journalisationNd")
    @OneToMany(mappedBy = "personne", fetch=FetchType.LAZY)
    private Collection<JournalisationND> journalisationND;
}



    

