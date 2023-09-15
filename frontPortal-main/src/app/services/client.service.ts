import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Activite} from "../../models/Activite";
import {UserEntity} from "../../models/userEntity";
import {Site} from "../../models/Site";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:8085/site/';
  constructor(private http: HttpClient) { }

  ajoutClient(site:Site):Observable<Site>{
    return this.http.post<Site>(this.url+'add',site)
  }

  updateSite(site:Site,id):Observable<Activite>{
    return this.http.put<Activite>(this.url+'update/'+ id ,site)
  }

  getAll():Observable<Site[]>{
    return  this.http.get<Site[]>(this.url+'getAll')
  }
  deleteTeam(id: number) :Observable<any>{
    return this.http.delete<Observable<any>>(this.url + 'delete/'+ id);
  }


}
