import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Productos } from '../models/productos';
import { QueryDataModel } from '../models/queryDatamodel';
import { CategoryModel } from '../../protected/models/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryyService{

  public url='https://localhost:44372/api/';

  public newCategoryId : number;
  public changeCategory$ = new BehaviorSubject(null)

  constructor(private http: HttpClient) {
    this.newCategoryId=null;
  }

  public setCategory(c:number){
    this.newCategoryId=c;
  }

  public changeCatgeory(){
    this.changeCategory$.next(true);
  }

  public getCategorySelected(){
    return this.newCategoryId;
  }

  public listCategories(userId:number): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel []>(`${this.url}category/list/${userId}`);
  }
  
}