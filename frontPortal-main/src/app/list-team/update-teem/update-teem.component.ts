import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserEntity} from "../../../models/userEntity";
import {Equipe} from "../../../models/Equipe";
import {TeamService} from "../../services/team.service";

@Component({
  selector: 'app-update-teem',
  templateUrl: './update-teem.component.html',
  styleUrls: ['./update-teem.component.css']
})
export class UpdateTeemComponent implements OnInit {

  users = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  close=false;
  message: File;
  photo: File;
  password=new FormControl(null, [Validators.required, Validators.minLength(8)])
  base64Data: Int8Array;
  retrievedImage: string;
  constructor(private teamService:TeamService,
              private toast:ToastrService,
              private accountService: AccountService,
              @Inject(MAT_DIALOG_DATA) public team: Equipe) {
this.getAllChef();
  }


  ngOnInit(): void {
  }


  updateUser() {


    this.teamService.updateEquipe(this.team,this.team.idE).subscribe(res => {
        this.toast.success('Mise à jour des données réussie ', 'Mise à jour', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.close=true;
      }

    )

  }
  getAllChef() {
    this.accountService.getAllUsersByRole('chef_equipe').subscribe((response) => {
      this.users = response;
    })
  }

  userCompare(user: any, u: any) {
    return user.id = u.id;
  }

}
