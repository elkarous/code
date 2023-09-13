package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;


@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString

public class Tache {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column( nullable = true)
    private Long idT;
    private String nomT;
    private Date dateDebut ;
    private Date dateFin  ;
    private String etat  ;
    private  String disc  ;
    @JsonManagedReference(value="tache")
    @OneToMany(mappedBy = "tache", fetch=FetchType.LAZY)
    private Collection<JournalisationT> journalisation  ;

  @JsonBackReference(value = "taches")
    @ManyToOne

    private Projet projet;


}

