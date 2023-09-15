import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from '../Authentification/token.service';
import {JournalisationT} from "../../models/JournalisationT";

@Injectable({
  providedIn: 'root'
})
export class JournalisationService {
  private url = 'http://localhost:8085/JournalisatinT/';

  constructor(private Token: TokenService, private http: HttpClient) {
  }


  getbyid(idapt: number): Observable<JournalisationT> {
    return this.http.get<JournalisationT>(this.url+'getById/' + idapt);
  }

  ajouterJournalisationT(journalisationT: JournalisationT): Observable<JournalisationT> {
    return this.http.post<JournalisationT>(this.url+'add', journalisationT);
  }

  updateJournalisationT(journalisationT: JournalisationT,id:number): Observable<JournalisationT> {
    return this.http.put<JournalisationT>(this.url+'update/' + id, journalisationT)
  }

  delete(id: number) {
    return this.http.delete(this.url+ 'delete/' + id);
  }

  getAll():Observable<JournalisationT[]>{
    return this.http.get<JournalisationT[]>(this.url+'getAll/')
}
  getNbreHeure(id:number ,date:Date):Observable<any[]>{
    return this.http.get<any[]>(this.url+'getNbreHeure/'+ id+'/'+date.toDateString())
  }

  getAllEvent():Observable<any[]>{
    return this.http.get<any[]>(this.url+'getAllEvent/')
  }

  getNbreHeureTotal(id:number,date:Date):Observable<number>{
    return this.http.get<number>(this.url+'getNbreHeureTotal/'+ id+'/'+date.toDateString())
  }

}
