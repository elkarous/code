package com.example.PortalMedical.Services;

import com.example.PortalMedical.DTO.Event;
import com.example.PortalMedical.DTO.JournalisationTDto;
import com.example.PortalMedical.DTO.ReportingDto;
import com.example.PortalMedical.Repositories.JournalisationNDRepository;
import com.example.PortalMedical.Repositories.JournalisationTRepository;

import com.example.PortalMedical.Repositories.UserRepository;
import com.example.PortalMedical.enteties.JournalisationND;
import com.example.PortalMedical.enteties.JournalisationT;
import com.example.PortalMedical.enteties.Tache;
import com.example.PortalMedical.enteties.UserEntity;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JournalisatinTServiceImpl implements JournalisationTService {
    private JournalisationTRepository journalisationTRepository;
    @Autowired
    private JournalisationNDRepository journalisationNDRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public JournalisationT addJournalisationT(JournalisationT journalisationT) {
        journalisationT.setNbheure(calculateDiff(journalisationT.getDateDebut(),
                journalisationT.getDateFin()));
        return journalisationTRepository.save(journalisationT);
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

    @Override
    public JournalisationTDto getJournalisationTById(Long journalisationTId) {
        Optional<JournalisationT> optionalEquipe = journalisationTRepository.findById(journalisationTId);
        if (optionalEquipe.isPresent()) {
            JournalisationT journalisationT = optionalEquipe.get();
            ModelMapper modelMapper = new ModelMapper();
            JournalisationTDto journalisationTDto = modelMapper.map(journalisationT, JournalisationTDto.class);
            Tache tache = journalisationTRepository.getTacheByTask(journalisationTId);
            journalisationTDto.setTache(tache);
            return journalisationTDto;
        }
        return null;
    }

    @Override
    public List<JournalisationT> getAllJournalisationT() {
        return journalisationTRepository.findAll();
    }

    @Override
    public List<Event> getAllEvent(long userId) {
        List<JournalisationT> journalisationTS = new ArrayList<>();
        List<JournalisationND> journalisationNS = new ArrayList<>();
        UserEntity user =  this.userRepository.findById(userId).get();
        switch (user.getRole()){
            case chef_equipe:
                long equipeId = user.getEquipe().getIdE();
                journalisationTS = journalisationTRepository.findAllByPersonne_Equipe_IdE(equipeId);
                journalisationNS = journalisationNDRepository.findAllByPersonne_Equipe_IdE(equipeId);
                break;
            case chef_service:
            case directeur_generale:
                journalisationTS = journalisationTRepository.findAll();
                journalisationNS = journalisationNDRepository.findAll();
                break;
            case employee:
                journalisationTS = journalisationTRepository.findAllByPersonne_Id(userId);
                journalisationNS = journalisationNDRepository.findAllByPersonne_Id(userId);
                break;
            default:
                break;
        }
       List<Event>  events = journalisationTS.stream().map(Event::mapFromJounalinationT).collect(Collectors.toList());
        List<Event> eventsFromN = journalisationNS.stream().map(Event::mapFromJounalinationND).collect(Collectors.toList());
        events.addAll(eventsFromN);

        return events;
    }


    @Override
    public JournalisationT updateJournalisationT(JournalisationT journalisationT) {
        journalisationT.setNbheure(calculateDiff(journalisationT.getDateDebut(),
                journalisationT.getDateFin()));
        return journalisationTRepository.save(journalisationT);
    }

    @Override
    public void deleteJournalisationT(Long journalisationTId) {
        journalisationTRepository.deleteById(journalisationTId);

    }
    @Override
    public List<ReportingDto> getNbreHeure(long id,Date date){
        return journalisationTRepository.getNbreHeure(id, date);
   }

    @Override
    public float getNbreHeureTotal(long id,Date date){
      Float nbr =   journalisationNDRepository.getNbreHeureTotal(id,date);
      if(nbr==null){
          nbr = (float) 0;
      }
        Float nbr2 =   journalisationTRepository.getNbreHeureTotal(id,date);
        if(nbr2==null){
            nbr2 = (float) 0;
        }
        return nbr2 + nbr;
    }

}
