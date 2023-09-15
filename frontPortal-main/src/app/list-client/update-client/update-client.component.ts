import {Component, Inject, OnInit} from '@angular/core';
import {Site} from "../../../models/Site";
import {ClientService} from "../../services/client.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  constructor(private clientService: ClientService,
              private toast: ToastrService,
              @Inject(MAT_DIALOG_DATA) public client: Site
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
