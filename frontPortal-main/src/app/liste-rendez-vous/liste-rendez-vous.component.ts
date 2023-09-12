import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RendezVousEntity} from "../../models/RendezVous";
import {MatPaginator} from "@angular/material/paginator";
import {RendezVousService} from "../services/rendez-vous.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  styleUrls: ['./liste-rendez-vous.component.css']
})
export class ListeRendezVousComponent implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource: MatTableDataSource<RendezVousEntity>;
  displayedColumns = ['id', 'patient', 'medecin', 'date', 'heure', 'action'];
  rdvs:RendezVousEntity[]=[]
  rdv=new RendezVousEntity()
  displayBasic2:boolean
  displayBasic1:boolean



constructor(private rdvService:RendezVousService,
            private toaster: ToastrService) {
    this.dataSource=new MatTableDataSource(this.rdvs);
}

  ngOnInit(): void {
this.rdvs=[]
    this.getrdvENattente();
    this.dataSource.paginator = this.paginator;

}
  getrdvENattente(){
    this.rdvService.getrdvByState('waiting').subscribe(data=>{
      this.dataSource.data=data;
    })

  }
  getbyid(id:number){
    this.rdvService.getbyid(id).subscribe(data=>this.rdv=data)
  }
  annuler(rv:RendezVousEntity){
    this.rdvService.refuserRdv(rv).subscribe(res=>{
      this.toaster.success('annuler avec succée')
      this.ngOnInit()
    })
  }

  confirmer(rv:RendezVousEntity){
    this.rdvService.confirmerRdv(rv).subscribe(res=>{
      this.toaster.success('confirmer avec succée')
      this.ngOnInit()
    })
  }

}
