package com.example.PortalMedical.Repositories;


import com.example.PortalMedical.enteties.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EquipeRepository extends JpaRepository<Equipe,Long> {
    Optional<Equipe> findBynomE(String nomE);
}
