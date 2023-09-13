package com.example.PortalMedical.Services;



import com.example.PortalMedical.enteties.JournalisationT;

import java.util.List;

public interface JournalisationTService {
    JournalisationT addJournalisationT (JournalisationT journalisationT );

    JournalisationT getJournalisationTById(Long  journalisationTId);

    List< JournalisationT > getAllJournalisationT ();

    JournalisationT  updateJournalisationT (JournalisationT  journalisationT );

    void deleteJournalisationT (Long  journalisationTId);
}
