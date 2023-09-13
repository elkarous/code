import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Role} from "../../../models/Role";
import {UserEntity} from "../../../models/userEntity";
import {Equipe} from "../../../models/Equipe";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  team: Equipe = new Equipe();
  constructor(private teamService: TeamService,
              private toast: ToastrService,
              private route: Router
  ) {
  }

  ngOnInit(): void {
  }


  addTeam() {
    this.teamService.ajoutEquipe(this.team)
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
