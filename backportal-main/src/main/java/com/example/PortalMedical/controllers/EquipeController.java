package com.example.PortalMedical.controllers;


import com.example.PortalMedical.Services.EquipeService;
import com.example.PortalMedical.enteties.Equipe;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/equipe")
@CrossOrigin(origins = "http://localhost:4200")
public class EquipeController {
    private EquipeService equipeService ;
    @PostMapping("/add")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Equipe> addEquipe (@RequestBody Equipe equipe){
        Equipe saveEquipe = equipeService.addEquipe(equipe);
        return new ResponseEntity<>(saveEquipe, HttpStatus.CREATED);
    }
    @GetMapping("/getByNonE/{nomE}")
    public ResponseEntity<Equipe> getEquipeeBynom(@PathVariable("nomE") String nomE){

        Equipe equipe = equipeService.getEquipeBynomE(nomE);
        return new ResponseEntity<>(equipe, HttpStatus.OK);
    }



    @GetMapping("/getById/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Equipe> getEquipeeById(@PathVariable("id") Long equipeId){
        Equipe equipe = equipeService.getEquipeById(equipeId);
        return new ResponseEntity<>(equipe, HttpStatus.OK);
    }


    @GetMapping("/getAll")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<List<Equipe>>getAllEquipe(){
        List<Equipe> equipes= equipeService.getAllEquipe();
        return new ResponseEntity<>(equipes, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<Equipe> updateEquipe(@RequestBody Equipe equipe ,@PathVariable("id") Long equipeId){
        equipe.setIdE(equipeId);
        Equipe updateEquipe= equipeService.updateEquipe(equipe);

        return new ResponseEntity<>(updateEquipe, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    @PostAuthorize("  hasAuthority('chef_service') or hasAuthority('directeur_generale')")
    public ResponseEntity<String> deleteEquipe(@PathVariable("id") Long equipeId){
        equipeService.deleteEquipe(equipeId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }

}

