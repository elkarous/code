package com.example.PortalMedical.Services;

import com.example.PortalMedical.Repositories.ActiviteRepository;
import com.example.PortalMedical.enteties.Activite;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ActiviteServiceImpl implements ActiviteService{
    private ActiviteRepository activiteRepository;
    @Override
    public Activite addActivite(Activite activite) {
        return activiteRepository.save(activite);
    }

    @Override
    public Activite getActiviteById(Long activiteId) {
        Optional<Activite> optionalActivite = activiteRepository.findById(activiteId);
        return optionalActivite.get();
    }

    @Override
    public List<Activite> getAllActivite() {
        return activiteRepository.findAll();

    }

    @Override
    public Activite updateActivite(Activite activite) {
         return activiteRepository.save(activite) ;
    }

    @Override
    public void deleteActivite(Long activiteId) {
        activiteRepository.deleteById(activiteId);
    }

}
