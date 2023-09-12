package com.example.PortalMedical.enteties;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.sun.istack.Nullable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Rendezvous")
public class RendezVousEntity implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private long idapt;
	
	private Date dateOfApt;
	
	private String patientEmail;
	
	@Enumerated(EnumType.STRING)
	private StateApt stateapt;
	public enum StateApt {
		   waiting , confirmed , refused , demande	 
		}
	
	@OneToOne
	private UserEntity user;
	
	
	@OneToOne
	private PatientEntity patient;
	
	
	
	/*
	 @Enumerated(EnumType.STRING)
	private Temprdv temprdv;
	
	@Enumerated(EnumType.STRING)
	Days days;
	public enum Days {
		Monday , Tuesday , Wednesday , Thursday , Friday , Saturday , Sunday 
	}
	
	
	@OneToOne(optional=true, cascade= {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    private UserEntity user;
	@ManyToOne
	 private HorairesRdvEntity horairesrdv;
    
	
	public HorairesRdvEntity getHorairesrdv() {
		return horairesrdv;
	}


	public void setHorairesrdv(HorairesRdvEntity horairesrdv) {
		this.horairesrdv = horairesrdv;
	}


	public UserEntity getUser() {
		return user;
	}


	public void setUser(UserEntity user) {
		this.user = user;
	}

	

	public Temprdv getTemprdv() {
		return temprdv;
	}


	public void setTemprdv(Temprdv temprdv) {
		this.temprdv = temprdv;
	}


	public long getIdapt() {
		return idapt;
	}


	public void setIdapt(long idapt) {
		this.idapt = idapt;
	}


	public Date getDateOfApt() {
		return dateOfApt;
	}


	public void setDateOfApt(Date dateOfApt) {
		this.dateOfApt = dateOfApt;
	}

	public StateApt getStateapt() {
		return stateapt;
	}


	public void setStateapt(StateApt stateapt) {
		this.stateapt = stateapt;
	}


	

	public Days getDays() {
		return days;
	}


	public void setDays(Days days) {
		this.days = days;
	}


	public static long getSerialversionuid() {
		return serialVersionUID;
	}


	public RendezVousEntity() {
		super();
		// TODO Auto-generated constructor stub
	}


	public RendezVousEntity(long idapt, Date dateOfApt, Temprdv temprdv, StateApt stateapt, Days days, UserEntity user,
			HorairesRdvEntity horairesrdv) {
		super();
		this.idapt = idapt;
		this.dateOfApt = dateOfApt;
		this.temprdv = temprdv;
		this.stateapt = stateapt;
		this.days = days;
		this.user = user;
		this.horairesrdv = horairesrdv;
	}
*/




}