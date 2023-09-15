import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserEntity } from 'src/models/userEntity';
import { AuthentificationService } from '../Authentification/authentification.service';
import { PasswordComponent } from '../Authentification/password/password.component';
import { TokenService } from '../Authentification/token.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: UserEntity | undefined;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(4)]);
  hide = true;

  loginForm = new FormGroup({
    email: this.email,
    password: this.password

  });
  constructor(private authService: AuthentificationService,
              private token: TokenService,
              private account: AccountService,
              private toastr: ToastrService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.email.reset();
    this.password.reset();
  }
  openDialog() {
    let dialogRef= this.dialog.open(PasswordComponent, {
      height: '50%',
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog2() {
    this.dialog.open(PasswordComponent, {
      height: '90%',
      width: '70%'
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }
    return this.email.hasError('email') ? 'E-mail non valide!' : '';
  }

  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }

    return this.email.hasError('email') ? 'E-mail non valide!' : '';
  }
  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }

    return this.password.hasError('password') ? 'Mot de paase invalide' : '';
  }

  signIn() {

    this.authService.login(this.loginForm.value).subscribe(
      res => this.handleResponse(res),
      err => this.toastr.error(
        ``,
        'Vérifiez votre e-mail et votre mot de passe !',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-left'
        }
      ));
  }


  handleResponse(data: any) {
    this.token.handle(data);
    this.account.changeAuthStatus(true);
    this.toastr.success(
      `Bienvenue ` + this.token.getUserName(),
      'Vous êtes connecté !',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left',

      },

    );
    this.account.getById(Number(this.token.getId())).subscribe((response)=>{
      localStorage.setItem('user',JSON.stringify(response))
    })
 this.router.navigateByUrl('/dashboard');

  }

}
