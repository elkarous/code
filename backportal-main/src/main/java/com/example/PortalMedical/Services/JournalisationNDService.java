package com.example.PortalMedical.Services;




import com.example.PortalMedical.DTO.JournalisationNDDto;
import com.example.PortalMedical.enteties.JournalisationND;

import java.util.List;

public interface JournalisationNDService {

    JournalisationND addJournalisationND (JournalisationND journalisationND );

    JournalisationNDDto getJournalisationNDById(Long  journalisationNDId);

    List< JournalisationND > getAllJournalisationND ();

    JournalisationND  updateJournalisationND (JournalisationND  journalisationND );

    void deleteJournalisationND (Long  journalisationNDId);

}
