import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserEntity} from 'src/models/userEntity';
import {TokenService} from '../Authentification/token.service';
import {ResetPassword} from '../../models/ResetPassword';
import {Role} from '../../models/Role';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  private url = 'http://localhost:8085/user/';

  constructor(private Token: TokenService, private http: HttpClient) {
  }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  getById(id: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(this.url + id);
  }

  getUserByEmail(id: string): Observable<UserEntity> {
    return this.http.get<UserEntity>(this.url + id);
  }

  getImages(imageName): Observable<any> {
    return this.http.get<any>(this.url + imageName);
  }

  updateUser(formData: FormData): Observable<UserEntity> {
    return this.http.put<UserEntity>(this.url, formData);
  }

  getAllUsers(): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(this.url);
  }

  addUser(formData: FormData): Observable<UserEntity> {
    return this.http.post<UserEntity>(this.url + 'register', formData);
  }

  addUserWithoutImage(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(this.url + 'add', user);
  }

  addUserWithoutImage1(user: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(this.url + 'add', user);
  }

  updateUserWithoutImage(user: UserEntity): Observable<UserEntity> {
    return this.http.put<UserEntity>(this.url + 'update', user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + id);
  }

  getuserByRole(role: string): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(this.url + 'getbyRole/' + role);
  }

  /*resetPassword(resetPassword:ResetPassword):Observable<string>{
      return this.http.post<string>(this.url+restPassword);
  }*/

}
