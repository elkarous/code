import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from 'src/app/services/account.service';
import {UserEntity} from 'src/models/userEntity';
import {AddEmployeetComponent} from './addemployee/add-employeet.component';
import {UpdateEmployeeComponent} from './updateemployee/update-employee.component';
import {Router} from "@angular/router";
import {TokenService} from "../Authentification/token.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['email', 'nom', 'prenom', 'sexe','role', 'age', 'creation_date', 'numtelephone', 'Actions'];
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
   connectedUser: UserEntity;

  constructor(private accountService: AccountService,
              private toast: ToastrService,
              private router:Router,
              private tokenService:TokenService,
              private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.users);
    this.connectedUser = tokenService.getUser();
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
    if(this.connectedUser.role.toString() === 'chef_equipe'){
      this.accountService.getAllUsersByEquipe(this.connectedUser.equipe.idE).subscribe(data => {
          this.dataSource.data = data;
        }
      );
    }else {
      this.accountService.getAllUsers().subscribe(data => {
          this.dataSource.data = data;
        }
      );
    }
  }

  deleteUser(id: number) {
    const confirm = window.confirm('voulez-vous supprimer ce employé');
    if (confirm) {
      this.accountService.deleteUser(id).subscribe(res => {
          this.toast.success('Employee supprimer ', 'Supprimer', {
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
    this.dialog.open(UpdateEmployeeComponent, dialogConfig);

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
    dialogConfig.height = '90%'
    this.dialog.open(AddEmployeetComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(() => this.ngAfterViewInit());
  }

  riderect(id) {
    const url = '/dashboard/reporting/'+id;
    this.router.navigateByUrl(url).then();

  }
}
