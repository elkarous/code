package com.example.PortalMedical.Services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.PortalMedical.DTO.UserDTO;
import com.example.PortalMedical.Repositories.PatientRepository;
import com.example.PortalMedical.Repositories.RendezVousRepository;
import com.example.PortalMedical.Repositories.UserRepository;
import com.example.PortalMedical.enteties.PatientEntity;
import com.example.PortalMedical.enteties.RendezVousEntity;
import com.example.PortalMedical.enteties.Role;
import com.example.PortalMedical.enteties.UserEntity;
import com.example.PortalMedical.enteties.RendezVousEntity.StateApt;

@Service
@Transactional
public class RendezVousServicesImpl implements RendezVousServices {

	@Autowired
    RendezVousRepository rvrepo;
	@Autowired
    UserRepository userRepository;
	@Autowired
	PasswordServices mailService;
	@Autowired
	PatientRepository patientRepository;
	
	@Override
	public RendezVousEntity ajouterApt(RendezVousEntity apt) {
		apt.setStateapt(StateApt.confirmed);
		RendezVousEntity rdvfind=rvrepo.findByDateOfAptAndStateapt(apt.getDateOfApt(),StateApt.confirmed);
		if(rdvfind!=null) {
			throw new RuntimeException("rdv est deja chargé");
		}else {
			UserEntity user=userRepository.findById(apt.getUser().getId()).get();
			apt.setUser(user);
			/*PatientEntity patient = patientRepository.findById(apt.getPatient().getId()).get();
			apt.setPatient(patient);
			apt.setPatientEmail(patient.getEmail());*/
			mailService.EnvoyerEmailAjout(apt);
			return rvrepo.save(apt);
		}
		
	}

	@Override
	public List<RendezVousEntity> retrieveAllApt() {
		return (List<RendezVousEntity>) rvrepo.findAll();

	}

	@Override
	public void deleteAptById(long aptId) {
		rvrepo.deleteById(aptId);			
	}

	@Override
	public RendezVousEntity updateApt(RendezVousEntity apt) {
		RendezVousEntity rdvfind=rvrepo.findByDateOfAptAndStateapt(apt.getDateOfApt(),StateApt.confirmed);
		RendezVousEntity rdv = rvrepo.findById(apt.getIdapt()).get();
		if(rdvfind==apt) {
			throw new RuntimeException("rdv est deja chargé");
		}else {
		UserEntity user = userRepository.findById(apt.getUser().getId()).get();
		rdv.setUser(user);
		mailService.EnvoyerEmailAjout(apt);
		rdv=rvrepo.save(apt);
		return rdv;
		}
	}

	@Override
	public List<RendezVousEntity> getAllRdvByUserId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RendezVousEntity> getAptByState(String state) {
		List<RendezVousEntity> Rdvs= new ArrayList<>();
		Rdvs= rvrepo.getByStateapt(StateApt.valueOf(state));
		return Rdvs;
	}

	@Override
	public List<RendezVousEntity> getAllAptList() {
        List<RendezVousEntity> rv = rvrepo.findAll();
        return rv;
	}

	@Override
	public void ChangeStateById(int aptId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void ChangeStateById1(int aptId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<RendezVousEntity> AfficherDemandes() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteAdsById1(int aptId) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<RendezVousEntity> getAllRdvByUserIdWaiting() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RendezVousEntity> getTodaysApt() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<RendezVousEntity> getAllRdvByUserIdWaiting2() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public RendezVousEntity demandeRDV(RendezVousEntity apt) { 
		/*List<UserEntity> users2= new ArrayList<UserEntity>();
		for(UserEntity u: apt.getUser()) {
		UserEntity us = userRepository.findById(u.getId()).get();
		users2.add(us);
		}*/
		UserEntity us = userRepository.findById(apt.getUser().getId()).get();
		apt.setUser(us);
		apt.setStateapt(StateApt.waiting);
		return rvrepo.save(apt);
		
	}

	@Override
	public RendezVousEntity getbyid(Long id) {
		
		return rvrepo.findById(id).get();
	}

	@Override
	public RendezVousEntity confirmerRdv(RendezVousEntity rdv) {
		RendezVousEntity rdvfind=rvrepo.findByDateOfAptAndStateapt(rdv.getDateOfApt(),StateApt.confirmed);
		if(rdvfind!=null) {
			throw new RuntimeException("rdv est deja chargé");
		}else {
			RendezVousEntity rv = rvrepo.findById(rdv.getIdapt()).get();
			rv.setStateapt(StateApt.confirmed);
			mailService.EnvoyerEmailAjout(rv);
			return rvrepo.save(rv);
		}
	}

	@Override
	public RendezVousEntity annulerRdv(RendezVousEntity rdv) {
		RendezVousEntity rv = rvrepo.findById(rdv.getIdapt()).get();
		rv.setStateapt(StateApt.refused);
		mailService.EnvoyerEmailRefuser(rv);
		return rvrepo.save(rv);
	} 	

}