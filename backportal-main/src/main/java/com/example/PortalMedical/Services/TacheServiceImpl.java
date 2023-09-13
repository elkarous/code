package com.example.PortalMedical.Services;

import com.example.PortalMedical.DTO.TacheDto;
import com.example.PortalMedical.Repositories.TacheRepository;
import com.example.PortalMedical.enteties.Projet;
import com.example.PortalMedical.enteties.Tache;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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
    public TacheDto getTacheById(Long tacheId) {
        Optional<Tache> optionalTache = tacheRepository.findById(tacheId);
        if(optionalTache.isPresent()){
            Tache tache =optionalTache.get();
            ModelMapper modelMapper = new ModelMapper();
            TacheDto tacheDto = modelMapper.map(tache, TacheDto.class);
            Projet projet = tacheRepository.getProgectByTask(tacheId);
            tacheDto.setProjet(projet);
            return tacheDto;
        }
        return  null;
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
