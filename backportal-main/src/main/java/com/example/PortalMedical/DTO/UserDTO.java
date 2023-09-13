
package com.example.PortalMedical.DTO;

import java.sql.Date;
import java.util.Collection;

import javax.persistence.*;

import com.example.PortalMedical.enteties.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private long id;
    private String nom;
    private String prenom;
    private Date age ;
    private String cin ;
    private Role role ;
    private String email;
    private String pays;
    private Gouvernerats gouvernerat;
	private String password;
    private Date creationDate;
    private String numtelephone;

    private int codepostal;
    private String ville;
	private Sexe sexe ;

    private UserEntity directeur  ;
    private Equipe equipe;

}

