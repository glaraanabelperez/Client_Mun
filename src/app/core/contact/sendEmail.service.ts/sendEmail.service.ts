import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  public url=environment.Url;
 
  constructor(private http: HttpClient) { 
  }

 
  public sendEmail(x:any): Observable<any> {
    return this.http.get<any>(`${this.url}User/email`);
  }



}
