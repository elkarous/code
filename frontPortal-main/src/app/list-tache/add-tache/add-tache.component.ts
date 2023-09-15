import { Component, OnInit } from '@angular/core';
import {Tache} from "../../../models/Tache";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Activite} from "../../../models/Activite";
import {AccountService} from "../../services/account.service";
import {ProjectService} from "../../services/project.service";
import {ToastrService} from "ngx-toastr";
import {formatDate} from "@angular/common";
import {TacheService} from "../../services/tache.service";
import {error} from "protractor";

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit {

  tache = new Tache();
  projets: Activite[] = [];
  id: number;
  constructor(private tacheService: TacheService,
              private userService: AccountService,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
  }


  ngOnInit(): void {
    this.getAllProject();
  }



  getAllProject() {
    this.projectService.getAll().subscribe(data => {
      this.projets = data;
    });
  }

  ajoutTache() {
    this.tacheService.ajouterTache(this.tache).subscribe(() => {
        this.toastr.success('ajout avec succes')
      },
      (error) => this.toastr.error(error))
  }


  projectCompare(project: any, p: any): boolean {
    return project.idA = p.idA;
  }
}
