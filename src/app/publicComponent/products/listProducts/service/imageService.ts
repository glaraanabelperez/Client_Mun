import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ImageTranser } from '../models/imagesTransferModel';
import { ProductImageModel } from '../models/productImageModel';

@Injectable({
  providedIn: 'root'
})
export class ImageService{

  imagesDeleteList: any []=[];
  imagesInsertList: ImageTranser []=[];
  url=environment.Url;

constructor(private http: HttpClient) {}


public get(productId:number):Observable<ProductImageModel[]>{
  return this.http.get<ProductImageModel[]>(`${this.url}images/${productId}`);
}

verifyFileOnServer(imageName:string):Observable<any>{
  var data:ProductImageModel=new ProductImageModel();
  data.Name=imageName.toString();
  return this.http.post<ProductImageModel>(`${this.url}images`, data);
}

public delete(productImage: number): Observable<any> {
  return this.http.delete<any>(`${this.url}category/state/${productImage}`);
}
  
public insert(productImage:ProductImageModel): Observable<any> {
  return this.http.put<any>(`${this.url}images`, productImage);
}
  
public upload(productImage:ProductImageModel): Observable<any> {
  return this.http.post<any>(`${this.url}images/state/${productImage.ProductImageId}`, productImage);
}

  //CONSULTAS SERVIDOR
public  insertFileOnServer(image){
    return  this.http.post(`${this.url}images/server}`, image);
  }


  
}





