package com.example.PortalMedical.Services;


import com.example.PortalMedical.DTO.JournalisationNDDto;
import com.example.PortalMedical.DTO.JournalisationTDto;
import com.example.PortalMedical.Repositories.JournalisationNDRepository;
import com.example.PortalMedical.enteties.ActiviteND;
import com.example.PortalMedical.enteties.JournalisationND;
import com.example.PortalMedical.enteties.JournalisationT;
import com.example.PortalMedical.enteties.Tache;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JournalisationNDServiceImpl implements JournalisationNDService {
    private JournalisationNDRepository journalisationNDRepository;

    @Override
    public JournalisationND addJournalisationND(JournalisationND journalisationND) {
        journalisationND.setNbheure(calculateDiff(journalisationND.getDateDebut(),
                journalisationND.getDateFin()));
        return journalisationNDRepository.save(journalisationND);

    }

    @Override
    public JournalisationNDDto getJournalisationNDById(Long journalisationNDId) {
        Optional<JournalisationND> journalisationNDoptional = journalisationNDRepository.findById(journalisationNDId);
            if (journalisationNDoptional.isPresent()) {
                JournalisationND journalisationND = journalisationNDoptional.get();
                ModelMapper modelMapper = new ModelMapper();
                JournalisationNDDto journalisationTDto = modelMapper.map(journalisationND, JournalisationNDDto.class);
                ActiviteND activiteND = journalisationNDRepository.getActiviteByTask(journalisationNDId);
                journalisationTDto.setActiviteND(activiteND);
                return journalisationTDto;
            }
            return null;
    }

    @Override
    public List<JournalisationND> getAllJournalisationND() {
        return journalisationNDRepository.findAll();
    }

    @Override
    public JournalisationND updateJournalisationND(JournalisationND journalisationND) {
        journalisationND.setNbheure(calculateDiff(journalisationND.getDateDebut(),
                journalisationND.getDateFin()));
        return journalisationNDRepository.save(journalisationND) ;
    }

    @Override
    public void deleteJournalisationND(Long journalisationNDId) {
        journalisationNDRepository.deleteById(journalisationNDId);
    }
    private long calculateDiff(Date startDate, Date endDate) {
        Instant instant = startDate.toInstant();
        Instant instant1 = endDate.toInstant();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDateTime startDateTime = instant.atZone(zoneId).toLocalDateTime();
        LocalDateTime endDateTime = instant1.atZone(zoneId).toLocalDateTime();
        Duration duration = Duration.between(startDateTime, endDateTime);
        return duration.toHours();
    }
}
