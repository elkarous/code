import {Component, OnInit} from '@angular/core';
import {TokenService} from '../Authentification/token.service';
import {Router} from '@angular/router';
import {UserEntity} from '../../models/userEntity';
import {LoaderService} from '../services/loader.service';
import {AccountService} from '../services/account.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private defaultImage = 'assets/img/logo.png';
  public imageUrl: string;
  user: UserEntity;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;

  constructor(private tokenService: TokenService,
              private router: Router,
              public LoadService: LoaderService,
              private accountService: AccountService,
              private dialog: MatDialog) {
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

}
