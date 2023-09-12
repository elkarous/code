import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserEntity} from '../../models/userEntity';
import {AccountService} from "../services/account.service";
import {Role} from "../../models/Role";
import {RendezVousService} from "../services/rendez-vous.service";
import {RendezVousEntity} from "../../models/RendezVous";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-demande-rendez-vous',
  templateUrl: './demande-rendez-vous.component.html',
  styleUrls: ['./demande-rendez-vous.component.css']
})
export class DemandeRendezVousComponent implements OnInit {

  ajoutRDVform: FormGroup;
  medecins: UserEntity[]=[];
  heures=['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
  date:Date;
  heur='';
  id:number;
  rendezvous=new RendezVousEntity();
  displayBasic1:boolean
  constructor(private fb: FormBuilder,
  private userService: AccountService,
              private rdvService: RendezVousService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllMedecin();
    this.ajoutRDVform =this.fb.group({
      patientEmail:['', Validators.required],
      user: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required]
    })
  }

  getAllMedecin(){
    this.userService.getuserByRole("Medecin").subscribe(data=>{this.medecins=data;
      console.log(this.medecins)});
  }

  ajoutRdv(){
    let hr = new Date(this.date+ 'T' + this.heur+ ':00');
    let rdv:any={patientEmail:this.ajoutRDVform.get('patientEmail').value, user:{id:this.id},dateOfApt:hr}
    console.log(this.date+this.heur,rdv )
    this.rdvService.demandeRDV(rdv).subscribe(data=> {
      this.toastr.info('Votre demande a été envoyer avec succées. Vous allez revecevoir un email de réponse', '',
        {timeOut: 10000, positionClass: 'toast-top-center'})

      this.router.navigate(['/'])
      this.displayBasic1 = true
    })
}


}
