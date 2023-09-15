import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {TeamService} from "../../services/team.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Equipe} from "../../../models/Equipe";
import {Activite} from "../../../models/Activite";
import {ProjectService} from "../../services/project.service";
import {Site} from "../../../models/Site";
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css']
})
export class UpdateProjectComponent implements OnInit {
  close = false;
  teamList: Equipe[];
  clients: Site[];
  typeTache = 'Projet';
  taskTypes = ['Projet', 'Non dev']

  constructor(private projectService: ProjectService,
              private toast: ToastrService,
              private clientService: ClientService,
              @Inject(MAT_DIALOG_DATA) public activite: Activite,
              private teamService: TeamService) {

    this.projectService.getById(activite.idA).subscribe((response)=>{
      this.activite = response;
    })

  }


  ngOnInit(): void {
    this.getAllTeam();
    this.getAllClient();
    if (this.activite.type === 'projet') {
      this.typeTache = 'Projet'
    } else {
      this.typeTache = 'Non dev'
    }
  }


  ajoutActivite() {
    this.projectService.updateActivite(this.activite).subscribe(res => {
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
