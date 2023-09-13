package com.example.PortalMedical.controllers;

import com.example.PortalMedical.Services.JournalisationTService;
import com.example.PortalMedical.enteties.JournalisationT;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/JournalisatinT")

public class JournalisatinTController {
    private JournalisationTService journalisationTService;
    @PostMapping("/add")
    public ResponseEntity<JournalisationT> addJournalisationT (@RequestBody JournalisationT journalisationT ){
        JournalisationT saveJournalisationT = journalisationTService.addJournalisationT(journalisationT);
        return new ResponseEntity<>(saveJournalisationT, HttpStatus.CREATED);
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<JournalisationT> getJournalisationTById(@PathVariable("id") Long journalisationTId){
        JournalisationT journalisationT = journalisationTService.getJournalisationTById(journalisationTId);
        return new ResponseEntity<>(journalisationT, HttpStatus.OK);
    }


    @GetMapping("/getAll")
    public ResponseEntity<List<JournalisationT>>getAllJournalisationT(){
        List<JournalisationT> journalisationTs= journalisationTService.getAllJournalisationT();
        return new ResponseEntity<>(journalisationTs, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")

    public ResponseEntity<JournalisationT> updateJournalisationT(@RequestBody JournalisationT journalisationT ,@PathVariable("id") Long journalisationTId){
        journalisationT.setIdJT(journalisationTId);
        JournalisationT updateJournalisationT=journalisationTService.updateJournalisationT(journalisationT);

        return new ResponseEntity<>(updateJournalisationT, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJournalisationT(@PathVariable("id") Long journalisationTId){
       journalisationTService.deleteJournalisationT(journalisationTId);
        return new ResponseEntity<>("User successfully deleted!", HttpStatus.OK);
    }

}
