import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from '../Authentification/token.service';
import {JournalisationND} from "../../models/JournalisationND";

@Injectable({
  providedIn: 'root'
})
export class JournalisationNDService {
  private url = 'http://localhost:8085/JournalisatinND/';

  constructor(private Token: TokenService, private http: HttpClient) {
  }


  getbyid(idapt: number): Observable<JournalisationND> {
    return this.http.get<JournalisationND>(this.url + 'getById/' + idapt);
  }

  ajouterJournalisation(journalisation: JournalisationND): Observable<JournalisationND> {
    return this.http.post<JournalisationND>(this.url + 'add', journalisation);
  }

  updateJournalisation(journalisation: JournalisationND, id: number): Observable<JournalisationND> {
    return this.http.put<JournalisationND>(this.url + 'update/' + id, journalisation)
  }

  delete(id: number) {
    return this.http.delete(this.url + 'delete/' + id);
  }

  getAll(): Observable<JournalisationND[]> {
    return this.http.get<JournalisationND[]>(this.url + 'getAll/')
  }


}
