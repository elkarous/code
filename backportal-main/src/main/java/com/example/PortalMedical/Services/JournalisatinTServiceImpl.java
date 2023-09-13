package com.example.PortalMedical.Services;

import com.example.PortalMedical.Repositories.JournalisationTRepository;

import com.example.PortalMedical.enteties.JournalisationT;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JournalisatinTServiceImpl implements JournalisationTService {
    private JournalisationTRepository journalisationTRepository;
    @Override
    public JournalisationT addJournalisationT(JournalisationT journalisationT) {
        return journalisationTRepository.save(journalisationT);
    }


    @Override
    public JournalisationT getJournalisationTById(Long journalisationTId) {
        Optional<JournalisationT> optionalEquipe = journalisationTRepository.findById(journalisationTId);
        return optionalEquipe.get();
    }

    @Override
    public List<JournalisationT> getAllJournalisationT() {
        return journalisationTRepository.findAll();
    }

    @Override
    public JournalisationT updateJournalisationT(JournalisationT journalisationT) {
        return journalisationTRepository.save(journalisationT) ;
    }

    @Override
    public void deleteJournalisationT(Long journalisationTId) {
        journalisationTRepository.deleteById(journalisationTId);

    }
}
