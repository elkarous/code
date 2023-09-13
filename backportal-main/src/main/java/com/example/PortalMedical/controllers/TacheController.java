package com.example.PortalMedical.controllers;

import com.example.PortalMedical.DTO.TacheDto;
import com.example.PortalMedical.DTO.UserDTO;
import com.example.PortalMedical.Services.TacheService;
import com.example.PortalMedical.enteties.Tache;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tache")
public class TacheController  {
    private TacheService tacheService;

    @PostMapping("/add")
    public ResponseEntity<Tache> addTache(@RequestBody Tache tache ){
        Tache saveTache = tacheService.addTache(tache);
        return new ResponseEntity<>(saveTache, HttpStatus.CREATED);
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<TacheDto> getTacheById(@PathVariable("id") Long tacheId){
        TacheDto tache = tacheService.getTacheById(tacheId);
        return new ResponseEntity<>(tache, HttpStatus.OK);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<Tache>>getAllTache(){
        List<Tache> taches= tacheService.getAllTache();
        return new ResponseEntity<>(taches, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")

    public ResponseEntity<Tache> updatePersonne(@RequestBody Tache tache ,@PathVariable("id") Long tacheId){
        tache.setIdT(tacheId);
        Tache updatedTache = tacheService.updateTache(tache);

        return new ResponseEntity<>(updatedTache, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTache(@PathVariable("id") Long tacheId){
       tacheService.deleteTache(tacheId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }
}




