package com.example.PortalMedical.Services;


import com.example.PortalMedical.Repositories.EquipeRepository;
import com.example.PortalMedical.enteties.Equipe;
import com.example.PortalMedical.enteties.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipeServiceImpl  implements EquipeService{
    private EquipeRepository equipeRepository;
    @Autowired
    public EquipeServiceImpl (EquipeRepository equipeRepository){
        this.equipeRepository=equipeRepository;

    }

    @Override
    public Equipe addEquipe(Equipe equipe) {
        return equipeRepository.save(equipe);
    }

    @Override
    public Equipe getEquipeById(Long equipeId) {
        Optional<Equipe> optionalEquipe = equipeRepository.findById(equipeId);
        return optionalEquipe.get();
    }

    @Override
    public List<Equipe> getAllEquipe() {
        return equipeRepository.findAll();
    }

    @Override
    public Equipe updateEquipe(Equipe equipe) {
        return equipeRepository.save(equipe) ;  }

    @Override
    public void deleteEquipe(Long equipeId) {
        equipeRepository.deleteById(equipeId);

    }
    @Override
   public  Equipe getEquipeBynomE(String nomE){
        Optional<Equipe> optionalEquipe = equipeRepository.findBynomE(nomE);
        return optionalEquipe.get();

    }

    @Override
    public  UserEntity getChefEquipeByEquipeId(long id){
        List<UserEntity> userEntities = equipeRepository.getChefEquipeByEquipeId(id);
       if(userEntities.isEmpty()){
           return null;
       }else return userEntities.get(0);

    }
}
