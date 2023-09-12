package com.example.PortalMedical.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PortalMedical.enteties.FichepatientEntity;

public interface FichespatientRepository extends JpaRepository <FichepatientEntity,Long> {

}
