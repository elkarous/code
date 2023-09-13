import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { UserEntity } from 'src/models/userEntity';
import {TeamService} from "../../services/team.service";
import {Equipe} from "../../../models/Equipe";

@Component({
  selector: 'app-updateemployee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  teamList = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  close=false;
  message: File;
  password=new FormControl(null, [Validators.required, Validators.minLength(8)])

  constructor(private accountService:AccountService,
              private toast:ToastrService,
              private teamService:TeamService,
              @Inject(MAT_DIALOG_DATA) public user: UserEntity) {}


  ngOnInit(): void {
    this.getAllTeam();
  }

  updateUser() {
      this.accountService.updateUserWithoutImage(this.user).subscribe(res => {
          this.toast.success('Mise à jour des données réussie ', 'Mise à jour', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.close=true;
        }

      )

  }
  getAllTeam(){
    this.teamService.getAll().subscribe((response)=>{
      this.teamList = response;
    })

  }
  equipeCompare(equipe:any, result:any){
    return equipe.idE === result.idE;
  }
}
