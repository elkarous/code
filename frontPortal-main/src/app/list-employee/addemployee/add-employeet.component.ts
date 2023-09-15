import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from 'src/app/services/account.service';
import {UserEntity} from 'src/models/userEntity';
import {Role} from '../../../models/Role';
import {TeamService} from "../../services/team.service";
import {Equipe} from "../../../models/Equipe";

@Component({
  selector: 'app-addemployee',
  templateUrl: './add-employeet.component.html',
  styleUrls: ['./add-employeet.component.css']
})
export class AddEmployeetComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  role = new FormControl('');
  user: UserEntity = new UserEntity();
  users:UserEntity[] = []
  hide = true;
  teamList = [];

  constructor(private accountService: AccountService,
              private toast: ToastrService,
              private route: Router,
              private teamService:TeamService,
  ) {
  }

  ngOnInit(): void {
    this.getAllTeam();
  }


  addUser() {
    this.accountService.addUserWithoutImage(this.user)
      .subscribe(res => {
          this.toast.success('Employé enregistré avec succès !', '', {
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
  getAllTeam(){
    this.teamService.getAll().subscribe((response)=>{
      this.teamList = response;
    })
  }

  roleChange() {
    this.user.directeur = null;
    this.user.equipe = null;
    switch (this.user.role.toString()) {
      case 'chef_equipe': {
        this.accountService.getAllUsersByRole('chef_service').subscribe((response)=>{
          this.users = response;
        })
        break;
      }
      case 'employee': {
        break;
      }
      case 'chef_service': {
        this.accountService.getAllUsersByRole('directeur_generale').subscribe((response)=>{
          this.users = response;
        })
        break;
      }
      default: {
        break
      }
    }
  }
  equipeCompare(equipe:any, result:any){
    return equipe.idE === result.idE;
  }

  equipeChange(value: Equipe) {
      if(this.user.role.toString() =='employee') {
        this.users.push(value.chef);
        this.user.directeur = value.chef;
      }
  }
}



