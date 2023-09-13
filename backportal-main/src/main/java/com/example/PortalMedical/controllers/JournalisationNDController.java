package com.example.PortalMedical.controllers;

import com.example.PortalMedical.Services.JournalisationNDService;
import com.example.PortalMedical.enteties.JournalisationND;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping("/JournalisatinND")

public class JournalisationNDController {

    private JournalisationNDService journalisationNDService;
    @PostMapping("/add")
    public ResponseEntity<JournalisationND> addJournalisationND (@RequestBody JournalisationND journalisationND ){
        JournalisationND saveJournalisationND = journalisationNDService.addJournalisationND(journalisationND);
        return new ResponseEntity<>(saveJournalisationND, HttpStatus.CREATED);
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<JournalisationND> getJournalisationNDById(@PathVariable("id") Long journalisationNDId){
        JournalisationND journalisationND = journalisationNDService.getJournalisationNDById(journalisationNDId);
        return new ResponseEntity<>(journalisationND, HttpStatus.OK);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<JournalisationND>>getAllJournalisationND(){
        List<JournalisationND> journalisationNDs= journalisationNDService.getAllJournalisationND();
        return new ResponseEntity<>(journalisationNDs, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")

    public ResponseEntity<JournalisationND> updateJournalisationND(@RequestBody JournalisationND journalisationND ,@PathVariable("id") Long journalisationNDId){
        journalisationND.setIdJND(journalisationNDId);
        JournalisationND updateJournalisationND=journalisationNDService.updateJournalisationND(journalisationND);

        return new ResponseEntity<>(updateJournalisationND, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJournalisationND(@PathVariable("id") Long journalisationNDId){
        journalisationNDService.deleteJournalisationND(journalisationNDId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }}
