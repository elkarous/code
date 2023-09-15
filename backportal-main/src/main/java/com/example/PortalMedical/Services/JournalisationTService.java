package com.example.PortalMedical.Services;



import com.example.PortalMedical.DTO.Event;
import com.example.PortalMedical.DTO.JournalisationTDto;
import com.example.PortalMedical.DTO.ReportingDto;
import com.example.PortalMedical.enteties.JournalisationT;

import java.util.Date;
import java.util.List;

public interface JournalisationTService {
    JournalisationT addJournalisationT (JournalisationT journalisationT );

    JournalisationTDto getJournalisationTById(Long  journalisationTId);

    List< JournalisationT > getAllJournalisationT ();

    List<Event> getAllEvent(long userId);

    JournalisationT  updateJournalisationT (JournalisationT  journalisationT );

    void deleteJournalisationT (Long  journalisationTId);

    List<ReportingDto> getNbreHeure(long id,Date date);

    float getNbreHeureTotal(long id, Date date);
}
