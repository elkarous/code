package com.example.PortalMedical.controllers;


import com.example.PortalMedical.Services.ActiviteService;
import com.example.PortalMedical.enteties.Activite;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/activite")

public class ActiviteController {
    private ActiviteService activiteService ;

    @PostMapping("/add")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Activite> addActivite (@RequestBody Activite activite){

        Activite saveActivite  = activiteService.addActivite (activite );
        return new ResponseEntity<>(saveActivite , HttpStatus.CREATED);
    }


    @GetMapping("/getById/{id}")

    public ResponseEntity<Activite > getActiviteById(@PathVariable("id") Long activiteId){
        Activite  activite  = activiteService.getActiviteById(activiteId);
        return new ResponseEntity<>(activite , HttpStatus.OK);
    }


    @GetMapping("/getAll")

    public ResponseEntity<List<Activite >>getAllActivite (){
        List<Activite > activites = activiteService.getAllActivite();
        return new ResponseEntity<>(activites , HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Activite > updateActivite (@RequestBody Activite  activite  ,@PathVariable("id") Long activiteId){
        activite .setIdA(activiteId);
        Activite  updateActivite = activiteService.updateActivite (activite );

        return new ResponseEntity<>(updateActivite , HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<String> deleteActivite (@PathVariable("id") Long activiteId){
        activiteService.deleteActivite (activiteId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }

}
