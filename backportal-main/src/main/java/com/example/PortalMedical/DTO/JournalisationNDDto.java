package com.example.PortalMedical.DTO;

import com.example.PortalMedical.enteties.ActiviteND;
import com.example.PortalMedical.enteties.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Data @AllArgsConstructor @NoArgsConstructor @ToString
public class JournalisationNDDto {

    private Long idJND ;
    private  int nbheure ;
    private Date dateDebut ;
    private Date dateFin  ;
    private String description;
    private ActiviteND activiteND;
    private UserEntity personne ;
}
