package com.example.PortalMedical.Services;

import com.example.PortalMedical.Repositories.SiteRepository;
import com.example.PortalMedical.enteties.Site;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SiteServiceImpl implements SiteService{
    private SiteRepository siteRepository;
    @Override
    public Site addSite(Site site) {
        return siteRepository.save(site);
    }

    @Override
    public Site getSiteById(Long siteId) {
        Optional<Site> optionalSite = siteRepository.findById(siteId);
        return optionalSite.get();
    }

    @Override
    public List<Site> getAllSite(){
        return siteRepository.findAll();
    }

    @Override
    public Site updateSite(Site site) {
        return siteRepository.save(site) ;
    }

    @Override
    public void deleteSite(Long siteId) {
       siteRepository.deleteById(siteId);

    }
}
