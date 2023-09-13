package com.example.PortalMedical.DTO;

import com.example.PortalMedical.enteties.JournalisationT;
import com.example.PortalMedical.enteties.Projet;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;



@Data @AllArgsConstructor @NoArgsConstructor @ToString

public class TacheDto {
    private Long idT;
    private String nomT;
    private Date dateDebut ;
    private Date dateFin  ;
    private String etat  ;
    private  String disc  ;
    private Collection<JournalisationT> journalisation  ;
    private Projet projet;

    @Override
    public String toString() {
        return "Tache{" +
                "idT=" + idT +
                ", nomT='" + nomT + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", etat='" + etat + '\'' +
                ", disc='" + disc + '\'' +
                ", journalisation=" + journalisation +
                ", projet=" + projet +
                '}';
    }
}

