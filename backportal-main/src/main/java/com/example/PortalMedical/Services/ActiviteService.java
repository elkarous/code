package com.example.PortalMedical.Services;

import com.example.PortalMedical.enteties.Activite;

import java.util.List;

public interface ActiviteService {
    Activite addActivite(Activite  activite);

    Activite getActiviteById(Long   activiteId);

    List<  Activite> getAllActivite();

    Activite updateActivite( Activite  activite);

    void deleteActivite(Long   activiteId);
}
