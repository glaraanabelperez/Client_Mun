import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Productos } from '../models/productos';
import { QueryDataModel } from '../models/queryDatamodel';
import { CategoryModel } from '../../protected/models/categoryModel';
import { OrderField } from '../models/OrderField';
import { Filter } from '../models/Filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatgeorieService{

url=environment.Url;

// public changeFilters$ = new BehaviorSubject(null)


constructor(private http: HttpClient) {

}



public obtenerCategoria(categoryId:number): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/${categoryId}`);
}

// public ChengeFilters(){
//   this.changeFilters$.next(true);
// }


public listCategories(): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/listActive/`);
}

  
}





