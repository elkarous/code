import {Component, Inject, OnInit} from '@angular/core';
import {Tache} from "../../../models/Tache";
import {Activite} from "../../../models/Activite";
import {TacheService} from "../../services/tache.service";
import {AccountService} from "../../services/account.service";
import {ProjectService} from "../../services/project.service";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.css']
})
export class UpdateTacheComponent implements OnInit {

  projets: Activite[] = [];
  id: number;
  constructor(private tacheService: TacheService,
              private userService: AccountService,
              private projectService: ProjectService,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public  tache:Tache,
              private toastr: ToastrService) {
    this.tacheService.getbyid(this.tache.idT).subscribe(response=> {
        this.tache =response;
      })
  }


  ngOnInit(): void {
    this.getAllProject();
  }



  getAllProject() {
    this.projectService.getAll().subscribe(data => {
      this.projets = data;
    });
  }

  update() {
    this.tacheService.updateTache(this.tache,this.tache.idT).subscribe(() => {
        this.toastr.success('ajout avec succes')
      },
      (error) => this.toastr.error(error))
  }


  projectCompare(project: any, p: any): boolean {
    return project.idA = p.idA;
  }
}
