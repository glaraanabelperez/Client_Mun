import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QueryDataModel } from '../models/queryDatamodel';
import { OrderField } from '../models/OrderField';
import { Filter } from '../models/Filter';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/productModel';
import { ProductImageModel } from '../models/productImageModel';
import { ProductModelResponse } from '../models/productModelResponse';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService{

  public url=environment.Url;
  public productId:number=null;
  public refresh$=new Subject<void>();

constructor(private http: HttpClient) {

}

public GetRefresh(){
  return this.refresh$;
}

public listAllProducts( f:Filter, from:number, length:number, orderAsce:boolean , o:OrderField): Observable<any[]> {
  const data = new QueryDataModel<Filter, OrderField>();

  data.filter = f;
  data.from = from;
  data.length = length;
  data.orderAsc = orderAsce;
  data.orderField = o;
  return this.http.post<any []>(`${this.url}product`, data);
}

public changePrice(percent, category, marca ):Observable<any>{
  return this.http.get<any>(`${this.url}product/price/${percent}/${category}/${marca}`)
  .pipe(
    tap(()=>{
      this.refresh$.next();
    })
  )
}

public getProduct(productId :number):Observable<ProductModel>{
  return this.http.get<any>(`${this.url}product/${productId}`);
}

public ProductToCard(productId :number):Observable<ProductModelResponse>{
  return this.http.get<any>(`${this.url}ProductToCard/${productId}`);
}

public getProductfeatured():Observable<ProductModelResponse[]>{
  return this.http.get<any>(`${this.url}products/list_feature`);
}

public update(product :ProductModel):Observable<any>{
  return this.http.put<any>(`${this.url}product`, product);
}

public insert(product :ProductModel):Observable<any>{
  return this.http.post<any>(`${this.url}product/insert`, product )
  .pipe(
    tap(()=>{
      this.refresh$.next();
    })
  )
}

public delete(productId:number):Observable<any>{
  return this.http.delete<any>(`${this.url}product/state/${productId}` )
  .pipe(
    tap(()=>{
      this.refresh$.next();
    })
  )
}

  
}





