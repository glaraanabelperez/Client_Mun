import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from 'src/environments/environment';
import { MarcaModel } from '../models/marcaModel';

@Injectable({
  providedIn: 'root'
})
export class MarcaService{

url=environment.Url;

// public changeFilters$ = new BehaviorSubject(null)


constructor(private http: HttpClient) {

}


public getActiveMarcas(): Observable<MarcaModel[]> {
  return this.http.get<MarcaModel []>(`${this.url}marca/listActive/`);
}

public getAllMarcas(): Observable<MarcaModel[]> {
  return this.http.get<MarcaModel []>(`${this.url}marca/list/`);
}

public save(data:MarcaModel): Observable<any> {
  return this.http.put<any>(`${this.url}marca/`, data);
}

public update(marcaId:number, data:MarcaModel): Observable<any> {
  return this.http.post<any>(`${this.url}marca/${marcaId}`, data);
}
  
}





