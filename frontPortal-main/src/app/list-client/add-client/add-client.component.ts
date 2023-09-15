import {Component, Inject, OnInit} from '@angular/core';
import {Equipe} from "../../../models/Equipe";
import {TeamService} from "../../services/team.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Site} from "../../../models/Site";
import {ClientService} from "../../services/client.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Site = new Site();
  constructor(private clientService: ClientService,
              private toast: ToastrService
  ) {
  }

  ngOnInit(): void {
  }


  addTeam() {
    this.clientService.ajoutClient(this.client)
      .subscribe(res => {
          this.toast.success('Equipe enregistré avec succès !', '', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
        },
        error => {
          this.toast.error(error.error.message, 'quelque chose est mal passé !!', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
        });

  }
}
