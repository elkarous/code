package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import java.util.Collection;


@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString


@DiscriminatorValue("nd")
public class ActiviteND extends Activite  {


    private String typeND  ;
    @JsonManagedReference(value = "activite")
    @OneToMany(mappedBy = "activiteND", fetch= FetchType.LAZY)
    private Collection<JournalisationND> journalisationND ;

}
