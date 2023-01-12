import { HttpClient } from '@angular/common/http';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from './login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login_correcto: boolean;
  public url=environment.Url;


  constructor(private http: HttpClient) { 
    console.log(localStorage.getItem('username')!=null)
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

  IsLogin():any{
    return localStorage.getItem('username')!=null;
  }

  isLoggedIn():boolean{
    return this.getUser()!== null;
  }


  register(data:LoginResponse) {
        this.login_correcto=true;
        // localStorage.setItem('codigo_usar', data.UserId.toString(10));
        localStorage.setItem('username', data.UserName);

  }

}
