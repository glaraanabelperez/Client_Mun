import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Productos } from '../models/productos';
import { QueryDataModel } from '../models/queryDatamodel';
import { CategoryModel } from '../../protected/models/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class LoadingService{

  private _loading = new BehaviorSubject<boolean>(true);
  public loading;

  constructor() {
      this._loading.subscribe(x => this.loading=x);
  }

  setLoading(show: boolean) {
    this._loading.next(show);
  }
 


  
}