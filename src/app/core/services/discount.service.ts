import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscountModel } from '../models/discountModel';

@Injectable({
  providedIn: 'root'
})
export class DiscountService{

url=environment.Url;

// public changeFilters$ = new BehaviorSubject(null)


constructor(private http: HttpClient) {

}



public getActiveDiscounts(): Observable<DiscountModel[]> {
  return this.http.get<DiscountModel []>(`${this.url}discount/listActive/`);
}

public getAllDiscounts(): Observable<DiscountModel[]> {
  return this.http.get<DiscountModel []>(`${this.url}discount/list/`);
}

public save(data:DiscountModel): Observable<any> {
  return this.http.put<any>(`${this.url}discount/`, data);
}

public update(discountId:number, data:DiscountModel): Observable<any> {
  return this.http.post<any>(`${this.url}discount/${discountId}`, data);
}
  
}





