package com.example.PortalMedical.Repositories;


import com.example.PortalMedical.enteties.Equipe;
import com.example.PortalMedical.enteties.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Locale;
import java.util.Optional;

public interface EquipeRepository extends JpaRepository<Equipe,Long> {
    Optional<Equipe> findBynomE(String nomE);
    @Query("select u from UserEntity u where u.equipe.idE = :id")
    List<UserEntity> getChefEquipeByEquipeId(@Param("id") long id);
}
