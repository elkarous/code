import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Patient} from "../../models/Patient";
import {Observable} from "rxjs";
import {Activite} from "../../models/Activite";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url = 'http://localhost:8085/activite/';
  constructor(private http: HttpClient) { }

  ajoutActivite(activite:Activite):Observable<Activite>{
    return this.http.post<Activite>(this.url+'add',activite)
  }
  getAll():Observable<Activite[]>{
    return  this.http.get<Activite[]>(this.url+'getAll')
  }

  updateActivite(activite:Activite):Observable<Activite>{
    return this.http.put<Activite>(this.url+'update/'+ activite.idA,activite)
  }
}
