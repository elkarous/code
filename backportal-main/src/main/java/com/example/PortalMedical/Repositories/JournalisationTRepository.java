package com.example.PortalMedical.Repositories;

import com.example.PortalMedical.DTO.ReportingDto;
import com.example.PortalMedical.enteties.JournalisationT;
import com.example.PortalMedical.enteties.Projet;
import com.example.PortalMedical.enteties.Tache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface JournalisationTRepository extends JpaRepository<JournalisationT, Long> {
    @Query("select j.tache from JournalisationT j where j.idJT = :id ")
    Tache getTacheByTask(@Param("id") long id);

    @Query(value = "SELECT SUM(valeur) as nbr ,d as date\n" +
            "FROM (select sum(nbheure) as valeur, DATE_FORMAT(date_debut, '%d/%m/%Y') as d\n" +
            "from journalisationt\n" +
            "where personne_id = :id\n" +
            "  and EXTRACT(MONTH from date_debut) = EXTRACT(MONTH from :date)\n" +
            "  and EXTRACT(YEAR from date_debut) = EXTRACT(year from :date)\n" +
            "group by EXTRACT(day from date_debut)\n" +
            "      UNION ALL\n" +
            "select sum(nbheure) as valeur, DATE_FORMAT(date_debut, '%d/%m/%Y') as d\n" +
            "from journalisationnd\n" +
            "where personne_id = :id\n" +
            "  and EXTRACT(MONTH from date_debut) = EXTRACT(MONTH from :date)\n" +
            "  and EXTRACT(YEAR from date_debut) = EXTRACT(year from :date)\n" +
            "group by EXTRACT(day from date_debut)\n" +
            "\n" +
            "      )  AS resultats_combines group by d;", nativeQuery = true)
    List<ReportingDto> getNbreHeure(@Param("id") long id, @Param("date") Date date);

    @Query("select SUM(j.nbheure) as nbr " +
            "from JournalisationT j where j.personne.id = :id " +
            "and MONTH(j.dateDebut) = MONTH(:date) and year (j.dateDebut) = year (:date) ")
    Float getNbreHeureTotal(@Param("id") long id, @Param("date") Date date);


}
