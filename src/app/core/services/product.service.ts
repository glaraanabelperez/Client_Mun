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

public changeFilters$ = new BehaviorSubject(null)
public f:Filter;
public o:OrderField;
public from:number;
public length:number;
public orderAsc:boolean

public product:Productos;


constructor(private http: HttpClient) {

}


public listAllProducts(): Observable<any[]> {
  const data = new QueryDataModel<Filter, OrderField>();

  data.filter = this.f;
  data.from = this.from;
  data.length = this.length;
  data.order = this.o;
  data.orderAsc = this.orderAsc;

  return this.http.post<any []>(`${this.url}product`, data);
}



public obtenerCategoria(userId:number): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/list/${userId}`);
}


public ChengeFilters(){
  this.changeFilters$.next(true);
}

public setFilters(f:Filter, o:OrderField, from:number, length:number, orderAsce:boolean){
 
  this.f=f;
  this.o=o;
  this.from=0;
  this.length=10;
  this.orderAsc=orderAsce;
}


public listCategories(userId:number): Observable<CategoryModel[]> {
  return this.http.get<CategoryModel []>(`${this.url}category/list/${userId}`);
}

  
}





