package com.example.PortalMedical.DTO;

import com.example.PortalMedical.enteties.JournalisationND;
import com.example.PortalMedical.enteties.JournalisationT;
import com.example.PortalMedical.enteties.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Event {
    private Long id;
    private int nbheure;
    private Date dateDebut;
    private Date dateFin;
    private String description;
    private String type;
    private UserEntity personne;

   public static Event mapFromJounalinationT(JournalisationT journalisationt) {
        Event event = new Event();
        event.setId(journalisationt.getIdJT());
        event.setDateDebut(journalisationt.getDateDebut());
        event.setDateFin(journalisationt.getDateFin());
        event.setDescription(journalisationt.getDescription());
        event.setPersonne(journalisationt.getPersonne());
        event.setType("JournalisationT");
        return event;
    }

   public static Event mapFromJounalinationND(JournalisationND journalisationt) {
        Event event = new Event();
        event.setId(journalisationt.getIdJND());
        event.setDateDebut(journalisationt.getDateDebut());
        event.setDateFin(journalisationt.getDateFin());
        event.setDescription(journalisationt.getDescription());
        event.setPersonne(journalisationt.getPersonne());
        event.setType("JournalisationND");
        return event;
    }
}
