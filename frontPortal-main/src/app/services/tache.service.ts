import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TokenService} from '../Authentification/token.service';
import {Tache} from "../../models/Tache";

@Injectable({
  providedIn: 'root'
})
export class TacheService {
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

  delete(id: number) {
    return this.http.delete(this.url +'delete/'+ id);
  }


  getAll():Observable<Tache[]>{
    return this.http.get<Tache[]>(this.url+'getAll/')
}


}
