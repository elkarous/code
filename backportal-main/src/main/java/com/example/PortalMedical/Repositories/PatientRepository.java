package com.example.PortalMedical.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.PortalMedical.enteties.PatientEntity;


@Repository
public interface PatientRepository extends JpaRepository <PatientEntity,Long> {

	PatientEntity findByNomAndPrenomAndEmail(String nom, String prenom, String email);

}
