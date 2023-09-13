import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RendezVousEntity} from 'src/models/RendezVous';
import {TokenService} from '../Authentification/token.service';
import {Activite} from "../../models/Activite";
import {Tache} from "../../models/Tache";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private url = 'http://localhost:8085/tache/';

  constructor(private Token: TokenService, private http: HttpClient) {
  }


  getbyid(idapt: number): Observable<Tache> {
    return this.http.get<Tache>(this.url+'getById/' + idapt);
  }

  ajouterTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(this.url+'add', tache);
  }

  updateTache(tache: Tache,id:number): Observable<Tache> {
    return this.http.put<Tache>(this.url+'update/' + id, tache)
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
  getrdvByState():Observable<Tache[]>{
    return this.http.get<Tache[]>(this.url+'getAll/')
}
refuserRdv(rdv:RendezVousEntity): Observable<RendezVousEntity>{
  return this.http.put<RendezVousEntity>(this.url+'refuser', rdv)
}
  confirmerRdv(rdv:RendezVousEntity): Observable<RendezVousEntity>{
    return this.http.put<RendezVousEntity>(this.url+'confirmer', rdv)
  }

}
