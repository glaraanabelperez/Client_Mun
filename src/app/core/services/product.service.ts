import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryDataModel } from '../models/queryDatamodel';
import { OrderField } from '../models/OrderField';
import { Filter } from '../models/Filter';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

url=environment.Url;


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



  
}





