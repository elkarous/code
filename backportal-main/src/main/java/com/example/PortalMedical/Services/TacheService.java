package com.example.PortalMedical.Services;




import com.example.PortalMedical.enteties.Tache;

import java.util.List;

public interface TacheService {

     Tache addTache (Tache  tache);

    Tache getTacheById(Long    tacheId);

    List<   Tache> getAllTache();

    Tache updateTache(  Tache   tache);

    void deleteTache(Long    tacheId);
}
