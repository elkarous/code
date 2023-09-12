package com.example.PortalMedical.enteties;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="FichePatient")
public class FichepatientEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long IdFiche;
	private Date Datedecreation;
	private String Matriculecnam;
	private String Causedeconsultation;
	private String Examen;
	private String Suivie;
	
	@ManyToOne
	private UserEntity user;
	
	/*
	public Long getIdFiche() {
		return IdFiche;
	}
	public Date getDatedecreation() {
		return Datedecreation;
	}
	public void setDatedecreation(Date datedecreation) {
		Datedecreation = datedecreation;
	}
	public String getMatriculecnam() {
		return Matriculecnam;
	}
	public void setMatriculecnam(String matriculecnam) {
		Matriculecnam = matriculecnam;
	}
	public String getCausedeconsultation() {
		return Causedeconsultation;
	}
	public void setCausedeconsultation(String causedeconsultation) {
		Causedeconsultation = causedeconsultation;
	}
	public String getExamen() {
		return Examen;
	}
	public void setExamen(String examen) {
		Examen = examen;
	}
	public String getSuivie() {
		return Suivie;
	}
	public void setSuivie(String suivie) {
		Suivie = suivie;
	}
	public void setIdFiche(long idFiche) {
		IdFiche = idFiche;
	}
	public FichepatientEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
	public FichepatientEntity(long idFiche, Date datedecreation, String matriculecnam, String causedeconsultation,
			String examen, String suivie) {
		super();
		this.IdFiche = idFiche;
		this.Datedecreation = datedecreation;
		this.Matriculecnam = matriculecnam;
		this.Causedeconsultation = causedeconsultation;
		this.Examen = examen;
		this.Suivie = suivie;
	}*/
	
}