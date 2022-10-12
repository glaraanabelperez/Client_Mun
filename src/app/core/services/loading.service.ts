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

  private _loading = new BehaviorSubject<boolean>(false);
  public loading;

  constructor() {
      this.loading=false;
      this._loading.subscribe(x => this.loading=x);
  }

  setLoading(show: boolean) {
    console.log(this.loading)
    this._loading.next(show);
  }
 


  
}