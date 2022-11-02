import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { QueryDataModel } from '../models/queryDatamodel';
import { CategoryModel } from '../models/categoryModel';
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

public deleteCategory(categoryId: number): Observable<any> {
  return this.http.delete<any>(`${this.url}category/delete/${categoryId}`);
}

public insertCategory(category:CategoryModel): Observable<any> {
  return this.http.put<any>(`${this.url}category`, category);
}

public uploadCategory(category:CategoryModel): Observable<any> {
  return this.http.put<any>(`${this.url}category/${category.CategoryId}`, category);
}
  
}





