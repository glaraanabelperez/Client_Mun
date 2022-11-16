import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryDataModel } from '../models/queryDatamodel';
import { OrderField } from '../models/OrderField';
import { Filter } from '../models/Filter';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/productModel';
import { ProductImageModel } from '../models/productImageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  url=environment.Url;
  public productId:number;

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

public getProduct(productId :number):Observable<ProductModel>{
  return this.http.get<any>(`${this.url}product/${productId}`);
}

public update(product :ProductModel):Observable<any>{
  return this.http.put<any>(`${this.url}product`, product);
}

public insert(product :ProductModel):Observable<any>{
  return this.http.post<any>(`${this.url}product/insert`, product );
}


  
}





