package com.example.PortalMedical.Repositories;

import com.example.PortalMedical.DTO.ReportingDto;
import com.example.PortalMedical.enteties.ActiviteND;
import com.example.PortalMedical.enteties.JournalisationND;
import com.example.PortalMedical.enteties.JournalisationT;
import com.example.PortalMedical.enteties.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface JournalisationNDRepository  extends JpaRepository<JournalisationND,Long> {
    @Query("select j.activiteND from JournalisationND j where j.idJND = :id ")
    ActiviteND getActiviteByTask(@Param("id")long id);

    List<JournalisationND> findAllByPersonne_Id(long personne_id);

    List<JournalisationND> findAllByPersonne_Equipe_IdE(long personne_id);

    @Query("select  function('date_format', j.dateDebut, '%Y, %m, %d') as date,SUM(j.nbheure) as nbr " +
            "from JournalisationND j where j.personne.id = :id and MONTH(j.dateDebut) = MONTH(:date) and year (j.dateDebut) = year (:date)" +
            " group by DAY(j.dateDebut)")
    List<ReportingDto> getNbreHeure(@Param("id") long id, @Param("date")Date date);;

    @Query("select SUM(j.nbheure) as nbr " +
            "from JournalisationND j where j.personne.id = :id " +
            "and MONTH(j.dateDebut) = MONTH(:date) and year(j.dateDebut) = year(:date) ")
    Float getNbreHeureTotal(@Param("id") long id, @Param("date") Date date);
}
