package com.example.PortalMedical.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.PortalMedical.enteties.OrdonnanceEntity;


public interface OrdonnanceRepository extends JpaRepository <OrdonnanceEntity,Long>{

}
