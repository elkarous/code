package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class JournalisationT {
    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    private Long idJT ;
    private  int nbheure ;
    private Date dateDebut ;
    private Date dateFin  ;
    private String description;
    @JsonBackReference(value="tache")
   @ManyToOne
    private Tache  tache;
    @JsonBackReference(value="personne")
    @ManyToOne
    private UserEntity  personne ;

}

