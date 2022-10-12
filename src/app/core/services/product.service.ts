import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Productos } from '../models/productos';
import { QueryDataModel } from '../models/queryDatamodel';
import { CategoryModel } from '../../protected/models/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  url='https://localhost:44372/api/';

  constructor(private http: HttpClient) {}

  
  public listAllProducts(userId:number, data:QueryDataModel): Observable<any[]> {
    return this.http.post<any []>(`${this.url}product`, data);
  }


  
}