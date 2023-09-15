package com.example.PortalMedical.controllers;

import com.example.PortalMedical.DTO.Event;
import com.example.PortalMedical.DTO.JournalisationTDto;
import com.example.PortalMedical.DTO.ReportingDto;
import com.example.PortalMedical.Services.JournalisationTService;
import com.example.PortalMedical.enteties.JournalisationT;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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
    public ResponseEntity<JournalisationTDto> getJournalisationTById(@PathVariable("id") Long journalisationTId){
        JournalisationTDto journalisationT = journalisationTService.getJournalisationTById(journalisationTId);
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

    @GetMapping("/getAllEvent")
    public ResponseEntity<List<Event>> getAllEvent(){
        List<Event> journalisationTs= journalisationTService.getAllEvent();
        return new ResponseEntity<>(journalisationTs, HttpStatus.OK);
    }

    @GetMapping("/getNbreHeure/{id}/{date}")
    public ResponseEntity<List<ReportingDto>> getNbreHeure(@PathVariable("id") Long id,@PathVariable("date") Date date){
      List<ReportingDto> list =  journalisationTService.getNbreHeure(id,date);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    @GetMapping("/getNbreHeureTotal/{id}/{date}")
    public ResponseEntity<Float> getNbreHeureTotal(@PathVariable("id") Long id,@PathVariable("date") Date date){
        float nbr =  journalisationTService.getNbreHeureTotal(id,date);
        return new ResponseEntity<>(nbr, HttpStatus.OK);
    }

}
