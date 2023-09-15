package com.example.PortalMedical.Repositories;


import com.example.PortalMedical.enteties.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ActiviteRepository extends JpaRepository <Activite,Long> {
    @Query("select a.equipe from Activite a where a.idA = :id ")
    Equipe getTeamByTask(@Param("id")long id);

    @Query("select a.site from Activite a where a.idA = :id ")
    Site getSiteByTask(@Param("id")long id);
}
