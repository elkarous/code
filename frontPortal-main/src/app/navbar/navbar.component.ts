import {Component, OnInit} from '@angular/core';
import {TokenService} from '../Authentification/token.service';
import {Router} from '@angular/router';
import {UserEntity} from '../../models/userEntity';
import {LoaderService} from '../services/loader.service';
import {AccountService} from '../services/account.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddEmployeetComponent} from "../list-employee/addemployee/add-employeet.component";
import {UpdateEmployeeComponent} from "../list-employee/updateemployee/update-employee.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserEntity;
  id: number;
  role = '';
  isEmployee = false

  constructor(private tokenService: TokenService,
              private router: Router,
              private accountService: AccountService,
              private dialog: MatDialog) {
    this.id = Number(this.tokenService.getId())
    this.role = this.tokenService.getRole();

  }

  ngOnInit(): void {
    this.getUserById();
  }


  getUserById() {
    this.accountService.getUserByEmail(this.tokenService.getId()).subscribe(data => {
        this.user = data;
      }
    );
  }

  logout() {
    this.tokenService.remove();
    this.router.navigateByUrl('/');
  }

  openUpdateDialog() {
    this.accountService.getById(this.id).subscribe((row) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      dialogConfig.height = '90%'
      dialogConfig.data = row;
      this.dialog.open(UpdateEmployeeComponent, dialogConfig);
    });
  }

  redirect() {
    const url = '/dashboard/reporting/' + this.id;
    this.router.navigateByUrl(url).then();
  }
}
