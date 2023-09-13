package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Equipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idE;
    private String nomE;

    @OneToMany(mappedBy = "equipe", fetch = FetchType.LAZY)
    private Collection<UserEntity> menbres;
    @JsonManagedReference(value = "equipe")
    @OneToMany(mappedBy = "equipe", fetch = FetchType.LAZY)
    private Collection<Activite> activites = new ArrayList<>();

}
