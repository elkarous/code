import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RendezVousEntity} from 'src/models/RendezVous';
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
    return this.http.delete(this.url + id);
  }

  demandeRDV(rdv: RendezVousEntity): Observable<RendezVousEntity>{
    return this.http.post<RendezVousEntity>(this.url+'demandeRDV',rdv);
  }

  getAllrdv():Observable<RendezVousEntity[]>{
    return this.http.get<RendezVousEntity[]>(this.url)
  }
  getAll():Observable<JournalisationT[]>{
    return this.http.get<JournalisationT[]>(this.url+'getAll/')
}
refuserRdv(rdv:RendezVousEntity): Observable<RendezVousEntity>{
  return this.http.put<RendezVousEntity>(this.url+'refuser', rdv)
}
  confirmerRdv(rdv:RendezVousEntity): Observable<RendezVousEntity>{
    return this.http.put<RendezVousEntity>(this.url+'confirmer', rdv)
  }

}
