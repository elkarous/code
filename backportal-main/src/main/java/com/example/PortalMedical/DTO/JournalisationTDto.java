package com.example.PortalMedical.DTO;

import com.example.PortalMedical.enteties.Tache;
import com.example.PortalMedical.enteties.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.ManyToOne;
import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class JournalisationTDto {
    private Long idJT ;
    private  int nbheure ;
    private Date dateDebut ;
    private Date dateFin  ;
    private String description;
    private Tache tache;
    private UserEntity personne ;
}
