package com.example.PortalMedical.Services;

import com.example.PortalMedical.DTO.ActiviteDto;
import com.example.PortalMedical.DTO.JournalisationTDto;
import com.example.PortalMedical.Repositories.ActiviteRepository;
import com.example.PortalMedical.enteties.*;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
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
    public ActiviteDto getActiviteById(Long activiteId) {
        Optional<Activite> optionalActivite = activiteRepository.findById(activiteId);

        if (optionalActivite.isPresent()) {
            Activite activite = optionalActivite.get();
            ModelMapper modelMapper = new ModelMapper();
            ActiviteDto activiteDto = modelMapper.map(activite, ActiviteDto.class);
            Site site = activiteRepository.getSiteByTask(activiteId);
            activiteDto.setSite(site);
            Equipe equipe = activiteRepository.getTeamByTask(activiteId);
            activiteDto.setEquipe(equipe);
            return activiteDto;
        }
        return null;
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
