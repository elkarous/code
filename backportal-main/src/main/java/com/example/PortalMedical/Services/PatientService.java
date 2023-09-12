package com.example.PortalMedical.Services;

import java.util.List;

import com.example.PortalMedical.enteties.PatientEntity;

public interface PatientService {
	PatientEntity ajout(PatientEntity patient);
	List<PatientEntity> getall ();
	PatientEntity getbyid(Long id);

}
