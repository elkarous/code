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
public class JournalisationND {
    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    private Long idJND ;
    private  long nbheure ;
    private Date dateDebut ;
    private Date dateFin  ;
    private String description;
    @JsonBackReference(value="activite")
    @ManyToOne
    private ActiviteND  activiteND;
    @JsonBackReference(value="journalisationNd")
    @ManyToOne
    private UserEntity  personne ;
}
