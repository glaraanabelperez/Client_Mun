import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Productos } from '../models/productos';
import { QueryDataModel } from '../models/queryDatamodel';
import { CategoryModel } from '../../protected/models/categoryModel';
import { OrderField } from '../models/OrderField';
import { Filter } from '../models/Filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

url='https://localhost:44372/api/';

// public changeFilters$ = new BehaviorSubject(null)


constructor(private http: HttpClient) {

}


public listAllProducts(f:Filter, o:OrderField, from:number, length:number, orderAsce:boolean): Observable<any[]> {
  const data = new QueryDataModel<Filter, OrderField>();

  data.filter = f;
  data.from = from;
  data.length = length;
  data.order = o;
  data.orderAsc = orderAsce;

  return this.http.post<any []>(`${this.url}product`, data);
}


public obtenerCategoria(userId:number): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/list/${userId}`);
}

// public ChengeFilters(){
//   this.changeFilters$.next(true);
// }


public listCategories(userId:number): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/list/${userId}`);
}

  
}





