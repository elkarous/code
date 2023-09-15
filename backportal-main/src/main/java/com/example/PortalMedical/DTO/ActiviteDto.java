package com.example.PortalMedical.DTO;

import com.example.PortalMedical.enteties.ActiviteND;
import com.example.PortalMedical.enteties.Equipe;
import com.example.PortalMedical.enteties.Projet;
import com.example.PortalMedical.enteties.Site;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;



@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ActiviteDto {

    protected Long idA;
    protected String nomA;
    protected Date dateDebut;
    protected Date dateFin;
    protected String etat;
    protected String type;
    protected String typeND;
    protected String disc;
    private Equipe equipe;
    private Site site;


}
