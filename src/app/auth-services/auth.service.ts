import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from './login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login_correcto: boolean;
  url='https://localhost:44372/api/';
  

  constructor(private http: HttpClient) { 
  }

 
  public login(login:LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}User/login`, login);
  }


  logout(){
    localStorage.removeItem('username');
  }

  getUser():any{
    return localStorage.getItem('username');
  }

  isLoggedIn():boolean{
    return this.getUser()!== null;
  }


  register(data:LoginResponse) {
        this.login_correcto=true;
        localStorage.setItem('codigo_usar', data.UserId.toString(10));
  }

}
