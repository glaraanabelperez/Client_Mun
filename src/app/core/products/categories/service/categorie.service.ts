import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { QueryDataModel } from '../../listProducts/models/queryDatamodel';
import { CategoryModel } from '../models/categoryModel';
import { OrderField } from '../../listProducts/models/OrderField';
import { Filter } from '../../listProducts/models/Filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatgeorieService{

url=environment.Url;

// public changeFilters$ = new BehaviorSubject(null)


constructor(private http: HttpClient) {

}



public get(categoryId:number): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/${categoryId}`);
}

public getCategoryByMarca(marcaId:number): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/listByMarca/${marcaId}`);
}

public list(): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/listActive/`);
}

public delete(categoryId: number): Observable<any> {
  return this.http.delete<any>(`${this.url}category/state/${categoryId}`);
}

public insert(category:CategoryModel): Observable<any> {
  return this.http.put<any>(`${this.url}category`, category);
}

public upload(category:CategoryModel): Observable<any> {
  return this.http.post<any>(`${this.url}category`, category);
}
  
}





