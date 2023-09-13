import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient} from "../../models/Patient";
import {Observable} from "rxjs";
import {Activite} from "../../models/Activite";
import {Equipe} from "../../models/Equipe";
import {UserEntity} from "../../models/userEntity";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url = 'http://localhost:8085/equipe/';
  constructor(private http: HttpClient) { }

  ajoutEquipe(equipe:Equipe):Observable<Activite>{
    return this.http.post<Activite>(this.url+'add',equipe)
  }

  updateEquipe(equipe:Equipe,id):Observable<Activite>{
    return this.http.put<Activite>(this.url+'update/'+ id ,equipe)
  }

  getAll():Observable<Equipe[]>{
    return  this.http.get<Equipe[]>(this.url+'getAll')
  }
  deleteTeam(id: number) :Observable<any>{
    return this.http.delete<Observable<any>>(this.url + 'delete/'+ id);
  }

  getChefEquipeByEquipeId(id:number):Observable<UserEntity>{
    return this.http.get<UserEntity>(this.url+'getChefEquipeByEquipeId/'+ id)
  }
}
