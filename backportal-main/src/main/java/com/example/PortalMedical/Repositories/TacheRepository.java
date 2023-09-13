package com.example.PortalMedical.Repositories;

import com.example.PortalMedical.enteties.Projet;
import com.example.PortalMedical.enteties.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TacheRepository extends JpaRepository<Tache,Long> {
    @Query("select t.projet from Tache t where t.idT = :id ")
    Projet getProgectByTask(@Param("id")long id);
}
