package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString


@DiscriminatorValue("projet")

public class Projet extends Activite {

    @JsonBackReference(value = "chef")
    @ManyToOne
    private UserEntity chef;
    @JsonManagedReference(value = "taches")
    @OneToMany(mappedBy = "projet", fetch = FetchType.LAZY)
    private Collection<Tache> taches;

    @Override
    public String toString() {
        return "Projet{" +
                "idA=" + idA +
                ", nomA='" + nomA + '\'' +
                ", dateDebut=" + dateDebut +
                ", dateFin=" + dateFin +
                ", etat='" + etat + '\'' +
                ", disc='" + disc + '\'' +
                '}';
    }
}
