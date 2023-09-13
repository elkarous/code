package com.example.PortalMedical.Services;




import com.example.PortalMedical.DTO.TacheDto;
import com.example.PortalMedical.enteties.Tache;

import java.util.List;

public interface TacheService {

     Tache addTache (Tache  tache);

    TacheDto getTacheById(Long    tacheId);

    List<   Tache> getAllTache();

    Tache updateTache(  Tache   tache);

    void deleteTache(Long    tacheId);
}
