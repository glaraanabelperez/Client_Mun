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
export class ImageService{

  url=environment.Url;

constructor(private http: HttpClient) {}


public getImages(productId:number):Observable<ProductImageModel[]>{

  return this.http.get<ProductImageModel[]>(`${this.url}image/${productId}`);
}


  
}





