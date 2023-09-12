package com.example.PortalMedical.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.PortalMedical.Services.PatientService;
import com.example.PortalMedical.enteties.PatientEntity;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/patient")
public class PatientController {
	@Autowired
	PatientService patientService;
	
	@PostMapping("/ajout")
	public PatientEntity ajout(@RequestBody PatientEntity patient) {
		return patientService.ajout(patient);
	}
	
	@GetMapping("/getall")
	public List<PatientEntity> getall() {
		return patientService.getall();
	}
	@GetMapping("/getbyid/{id}")
	public PatientEntity getByid(@PathVariable(name="id") Long id) {
		return patientService.getbyid(id);
	}
}
