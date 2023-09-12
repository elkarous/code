package com.example.PortalMedical.Repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PortalMedical.enteties.RendezVousEntity;
import com.example.PortalMedical.enteties.RendezVousEntity.StateApt;

public interface RendezVousRepository extends JpaRepository<RendezVousEntity, Long>{

	List<RendezVousEntity> getByStateapt(StateApt valueOf);

	RendezVousEntity findByDateOfAptAndStateapt(Date dateOfApt, StateApt stateapt);

	
}
