package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class JournalisationND {
    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    private Long idJND ;
    private  int nbheure ;
    @JsonBackReference(value="activite")
    @ManyToOne
    private ActiviteND  activiteND;
    @JsonBackReference(value="journalisationNd")
    @ManyToOne
    private UserEntity  personne ;
}
