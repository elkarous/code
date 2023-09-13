package com.example.PortalMedical.Services;

import com.example.PortalMedical.Repositories.TacheRepository;
import com.example.PortalMedical.enteties.Tache;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class TacheServiceImpl  implements TacheService{
  private TacheRepository tacheRepository;
    @Override
    public Tache addTache(Tache tache) {
        return tacheRepository.save(tache);
    }

    @Override
    public Tache getTacheById(Long tacheId) {
        Optional<Tache> optionalTache = tacheRepository.findById(tacheId);
        return optionalTache.get();
    }

    @Override
    public List<Tache> getAllTache() {
        return tacheRepository.findAll();
    }

    @Override
    public Tache updateTache(Tache tache) {
        return tacheRepository.save(tache) ;
    }

    @Override
    public void deleteTache(Long tacheId) {
        tacheRepository.deleteById(tacheId);
    }
}
