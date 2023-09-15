import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserEntity} from "../../models/userEntity";
import {AccountService} from "../services/account.service";
import {ProjectService} from "../services/project.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateEmployeeComponent} from "../list-employee/updateemployee/update-employee.component";
import {AddEmployeetComponent} from "../list-employee/addemployee/add-employeet.component";
import {TeamService} from "../services/team.service";
import {AddTeamComponent} from "./add-team/add-team.component";
import {UpdateTeemComponent} from "./update-teem/update-teem.component";

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css']
})
export class ListTeamComponent implements OnInit {

  displayedColumns: string[] = [ 'nomE','chef', 'Actions'];
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
              private teamService:TeamService,
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
    this.teamService.getAll().subscribe(data => {
        this.dataSource.data = data;
      }
    );
  }

  deleteTeam(id: number) {
    const confirm = window.confirm('voulez-vous supprimer ce equipe');
    if (confirm) {
      this.teamService.deleteTeam(id).subscribe(
        () => {
          this.toast.success('Equipe supprimer ', 'Supprimer', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.ngAfterViewInit();
        },
        () => {
          this.toast.success('Equipe supprimer ', 'Supprimer', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          });
          this.ngAfterViewInit();
        })
    }
  }

  onEdit(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = row;
    this.dialog.open(UpdateTeemComponent, dialogConfig);

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
    this.dialog.open(AddTeamComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());
  }
}
