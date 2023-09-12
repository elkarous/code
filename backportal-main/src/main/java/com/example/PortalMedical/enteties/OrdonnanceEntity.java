package com.example.PortalMedical.enteties;

import java.io.Serializable;
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
@Table(name="Ordonnance")
public class OrdonnanceEntity  implements Serializable{
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idOrdonnance;
    private Date ordonnance;
    private String MatriculedeCNAM;
    private String NomDuMedicament;
    private String Dosagedemédicament; 
    private String Formemedicament; 
    private int nbredefoisParjour;
    private int quantité;
    
    @ManyToOne
	private UserEntity user;
    
    /*
	public String getNomDuMedicament() {
		return NomDuMedicament;
	}
	public void setNomDuMedicament(String NomDuMedicament) {
		this.NomDuMedicament = NomDuMedicament;
	}
	public long getIdOrdonnance() {
		return idOrdonnance;
	}
	public void setIdOrdonnance(long idOrdonnance) {
		this.idOrdonnance = idOrdonnance;
	}
	public Date getOrdonnance() {
		return ordonnance;
	}
	public void setOrdonnance(Date ordonnance) {
		this.ordonnance = ordonnance;
	}
	public String getMatriculedeCNAM() {
		return MatriculedeCNAM;
	}
	public void setMatriculedeCNAM(String matriculedeCNAM) {
		MatriculedeCNAM = matriculedeCNAM;
	}
	public String getDosagedemédicament() {
		return Dosagedemédicament;
	}
	public void setDosagedemédicament(String dosagedemédicament) {
		Dosagedemédicament = dosagedemédicament;
	}
	public String getFormemedicament() {
		return Formemedicament;
	}
	public void setFormemedicament(String formemedicament) {
		Formemedicament = formemedicament;
	}
	public int getNbredefoisParjour() {
		return nbredefoisParjour;
	}
	public void setNbredefoisParjour(int nbredefoisParjour) {
		this.nbredefoisParjour = nbredefoisParjour;
	}
	public int getQuantité() {
		return quantité;
	}
	public void setQuantité(int quantité) {
		this.quantité = quantité;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public OrdonnanceEntity(long idOrdonnance, Date ordonnance, String matriculedeCNAM, String NomDuMedicament,
			String dosagedemédicament, String formemedicament, int nbredefoisParjour, int quantité) {
		super();
		this.idOrdonnance = idOrdonnance;
		this.ordonnance = ordonnance;
		MatriculedeCNAM = matriculedeCNAM;
		this.NomDuMedicament = NomDuMedicament;
		Dosagedemédicament = dosagedemédicament;
		Formemedicament = formemedicament;
		this.nbredefoisParjour = nbredefoisParjour;
		this.quantité = quantité;
	}
	public OrdonnanceEntity() {
		super();
		// TODO Auto-generated constructor stub
	}
    */
}
