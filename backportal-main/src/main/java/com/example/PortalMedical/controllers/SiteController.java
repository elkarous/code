package com.example.PortalMedical.controllers;


import com.example.PortalMedical.Services.SiteService;
import com.example.PortalMedical.enteties.Site;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("/site")

public class SiteController {
    private SiteService siteService;

    @PostMapping("/add")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Site> addSite(@RequestBody Site site ){
        Site saveSite = siteService.addSite(site);
        return new ResponseEntity<>(saveSite, HttpStatus.CREATED);
    }


    @GetMapping("/getById/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Site> getSiteById(@PathVariable("id") Long siteId){
        Site site = siteService.getSiteById(siteId);
        return new ResponseEntity<>(site, HttpStatus.OK);
    }


    @GetMapping("/getAll")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<List<Site>>getAllSite(){
        List<Site> sites= siteService.getAllSite();
        return new ResponseEntity<>(sites, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Site> updateSite(@RequestBody Site site ,@PathVariable("id") Long siteId){
        site.setIdS(siteId);
        Site updatedSite = siteService.updateSite(site);

        return new ResponseEntity<>(updatedSite, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<String> deleteSite(@PathVariable("id") Long siteId){
        siteService.deleteSite(siteId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }
}

