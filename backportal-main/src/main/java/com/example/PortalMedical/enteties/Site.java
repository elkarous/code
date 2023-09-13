package com.example.PortalMedical.enteties;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Collection;


    @Entity
    @Data @AllArgsConstructor @NoArgsConstructor @ToString

    public class Site
    {
        @Id
        @GeneratedValue(strategy= GenerationType.IDENTITY)
        private  Long idS;
        private String nomS ;
       @JsonManagedReference(value="site")
        @OneToMany(mappedBy = "site", fetch=FetchType.LAZY)
        private Collection<Activite> activites ;
}
