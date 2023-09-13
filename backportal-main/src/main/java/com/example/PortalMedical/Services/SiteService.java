package com.example.PortalMedical.Services;





import com.example.PortalMedical.enteties.Site;

import java.util.List;

public interface SiteService {
    Site addSite (Site   site);

    Site getSiteById(Long     siteId);

    List<    Site> getAllSite();

    Site updateSite(   Site    site);

    void deleteSite(Long     siteId);
}
