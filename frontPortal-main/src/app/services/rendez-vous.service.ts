import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RendezVousEntity} from 'src/models/RendezVous';
import {TokenService} from '../Authentification/token.service';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private url = 'http://localhost:8085/rendezvous/';

  constructor(private Token: TokenService, private http: HttpClient) {
  }


  getbyid(idapt: number): Observable<RendezVousEntity> {
    return this.http.get<RendezVousEntity>(this.url+'getById/' + idapt);
  }

  ajouterApt(rdv: RendezVousEntity): Observable<RendezVousEntity> {
    return this.http.post<RendezVousEntity>(this.url+'ajouterApt', rdv);
  }

  updateApt(rdv: RendezVousEntity): Observable<RendezVousEntity> {
    return this.http.put<RendezVousEntity>(this.url+'modifier', rdv)
  }

  deleterdv(id: number) {
    return this.http.delete(this.url + id);
  }

  demandeRDV(rdv: RendezVousEntity): Observable<RendezVousEntity>{
    return this.http.post<RendezVousEntity>(this.url+'demandeRDV',rdv);
  }

  getAllrdv():Observable<RendezVousEntity[]>{
    return this.http.get<RendezVousEntity[]>(this.url)
  }
  getrdvByState(state : string):Observable<RendezVousEntity[]>{
    return this.http.get<RendezVousEntity[]>(this.url+'getByState/'+state)
}
refuserRdv(rdv:RendezVousEntity): Observable<RendezVousEntity>{
  return this.http.put<RendezVousEntity>(this.url+'refuser', rdv)
}
  confirmerRdv(rdv:RendezVousEntity): Observable<RendezVousEntity>{
    return this.http.put<RendezVousEntity>(this.url+'confirmer', rdv)
  }

}
