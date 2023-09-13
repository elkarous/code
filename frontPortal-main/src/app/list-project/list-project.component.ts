import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserEntity} from "../../models/userEntity";
import {AccountService} from "../services/account.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateEmployeeComponent} from "../gestion-des-patients/updateemployee/update-employee.component";
import {AddEmployeetComponent} from "../gestion-des-patients/addemployee/add-employeet.component";
import {ProjectService} from "../services/project.service";
import {AddProjectComponent} from "./add-project/add-project.component";
import {UpdateProjectComponent} from "./update-project/update-project.component";

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css']
})
export class ListProjectComponent implements OnInit {

  displayedColumns: string[] = [ 'nomA', 'type', 'dateDebut', 'dateFin', 'etat', 'disc', 'Actions'];
  private defaultImage = 'assets/img/logo.png';
  public imageUrl: string;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: UserEntity[];
  images: string[];
  base64Data: Int8Array;
  retrievedImage: string;
  lang: any;

  constructor(private accountService: AccountService,
              private projectService:ProjectService,
              private toast: ToastrService,
              private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngOnInit(): void {
    this.getAllUser();
  }


  ngAfterViewInit() {
    this.getAllUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllUser() {
    this.projectService.getAll().subscribe(data => {
        this.dataSource.data = data;
      }
    );
  }

  deleteUser(id: number) {
    const confirm = window.confirm('voulez-vous supprimer ce patient');
    if (confirm) {
      this.accountService.deleteUser(id).subscribe(res => {
          this.toast.success('Patient supprimer ', 'Supprimer', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.ngAfterViewInit();
        },
        error => this.toast.error('something wrong '));
    }
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(UpdateProjectComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());
  }


  onError(): void {
    this.retrievedImage = this.defaultImage;
  }

  add() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AddProjectComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());
  }
}
