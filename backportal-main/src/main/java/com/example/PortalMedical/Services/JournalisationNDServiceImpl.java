package com.example.PortalMedical.Services;


import com.example.PortalMedical.Repositories.JournalisationNDRepository;
import com.example.PortalMedical.enteties.JournalisationND;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JournalisationNDServiceImpl implements JournalisationNDService {
    private JournalisationNDRepository journalisationNDRepository;

    @Override
    public JournalisationND addJournalisationND(JournalisationND journalisationND) {
        return journalisationNDRepository.save(journalisationND);

    }

    @Override
    public JournalisationND getJournalisationNDById(Long journalisationNDId) {
        Optional<JournalisationND> journalisationNDoptional = journalisationNDRepository.findById(journalisationNDId);
        return journalisationNDoptional.get();
    }

    @Override
    public List<JournalisationND> getAllJournalisationND() {
        return journalisationNDRepository.findAll();
    }

    @Override
    public JournalisationND updateJournalisationND(JournalisationND journalisationND) {
        return journalisationNDRepository.save(journalisationND) ;
    }

    @Override
    public void deleteJournalisationND(Long journalisationNDId) {
        journalisationNDRepository.deleteById(journalisationNDId);
    }
}
