package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type",
        visible = true)
@JsonSubTypes({
        @JsonSubTypes.Type(value = ActiviteND.class, name = "nd"),
        @JsonSubTypes.Type(value = Projet.class, name = "projet")})
public class Activite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, nullable = true)
    protected Long idA;
    protected String nomA;
    protected Date dateDebut;
    protected Date dateFin;
    protected String etat;
    protected String disc;
    @JsonBackReference(value = "equipe")
    @ManyToOne
    private Equipe equipe;
    @JsonBackReference(value = "site")
    @ManyToOne
    private Site site;


}
