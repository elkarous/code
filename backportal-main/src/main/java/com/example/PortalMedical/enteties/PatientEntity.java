package com.example.PortalMedical.enteties;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "patient")

public class PatientEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	
    private String nom;
    private String prenom;
    private String email;
    private String numtelephone;
}
