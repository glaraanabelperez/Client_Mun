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

public verifyFileOnServer(imageName:string):Observable<any>{
  var data:ProductImageModel=new ProductImageModel();
  data.Name=imageName.toString();
  return this.http.post<ProductImageModel>(`${this.url}images`, data);
}

public delete(list:ProductImageModel[]): Observable<any> {
  return this.http.delete<any>(`${this.url}category/state/${list}`);
}
  
public insert(imageTransfer:any, productId: number): Observable<any> {
  return this.http.put<any>(`${this.url}insert_Image/${productId}`, imageTransfer);
}
  
public upload(productImage:ProductImageModel): Observable<any> {
  return this.http.post<any>(`${this.url}images/state/${productImage.ProductImageId}`, productImage);
}

  //CONSULTAS SERVIDOR
public  insertFileOnServer(image): Observable<any>{
    return  this.http.post(`${this.url}images/server}`, image);
  }

  public deleteImageServer(image:any) :Observable<any>{
    return  this.http.post(`${this.url}images/server}`, image);
  }

  //observables encadenados
  
  // deleteImages(list:any[]) {
  //   return this.http.get('/api/books/' + id).pipe(
  //     switchMap((book: any) => this.http.get('/api/authors/' + book.author_id).pipe(
  //       map((author: any) => {
  //         book.author = author;
  //         return book;
  //       })
  //     ))
  //   );
  // }

  
}





