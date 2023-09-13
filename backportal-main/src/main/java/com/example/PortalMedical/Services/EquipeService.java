package com.example.PortalMedical.Services;


import com.example.PortalMedical.enteties.Equipe;
import com.example.PortalMedical.enteties.UserEntity;

import java.util.List;

public interface EquipeService {
    Equipe addEquipe(Equipe equipe);

    Equipe getEquipeById(Long  equipeId);

    List< Equipe> getAllEquipe();

     Equipe updateEquipe(Equipe equipe);

    void deleteEquipe(Long  EquipeId);

    Equipe getEquipeBynomE(String nomE);

    UserEntity getChefEquipeByEquipeId(long id);
}
