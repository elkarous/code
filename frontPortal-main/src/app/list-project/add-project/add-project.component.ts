import {Component, Inject, OnInit} from '@angular/core';
import {Equipe} from "../../../models/Equipe";
import {ProjectService} from "../../services/project.service";
import {ToastrService} from "ngx-toastr";
import {TeamService} from "../../services/team.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Activite} from "../../../models/Activite";
import {Site} from "../../../models/Site";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  close = false;
  teamList: Equipe[];
  clients: Site[];
  activite = new Activite();
  typeTache = 'Projet';
  taskTypes = ['Projet', 'Non dev']

  constructor(private projectService: ProjectService,
              private toast: ToastrService,
              private clientService: ClientService,
              private teamService: TeamService) {

  }


  ngOnInit(): void {
    this.getAllTeam();
    this.getAllClient();
  }


  ajoutActivite() {
    if (this.typeTache === 'Projet') {
      this.activite.type = 'projet'
    } else {
      this.activite.type = 'nd'
    }
    this.projectService.ajoutActivite(this.activite).subscribe(res => {
        this.toast.success('Mise à jour des données réussie ', 'Mise à jour', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.close = true;
      }
    )

  }

  getAllTeam() {
    this.teamService.getAll().subscribe((response) => {
      this.teamList = response;
    })

  }

  equipeCompare(equipe: any, result: any) {
    return equipe.idE === result.idE;
  }

  getAllClient() {
    this.clientService.getAll().subscribe((response) => {
      this.clients = response
    })
  }
}
