import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { ServiceMetodos } from '../core/servicios-generales/service-general.metodos';
import { ServiceGeneral } from '../core/servicios-generales/service-general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login_correcto: boolean;
 
  constructor(private _service_g:ServiceGeneral) { 
  }

  login(user:String, password:String):boolean{
    this.traer_usuarios_base_corroborar(user, password);
    if(this.login_correcto){
      return true;
    }
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

  traer_usuarios_base_corroborar(user:String, password:String){
    this._service_g.traer_usuarios()
    .then(data=>{
      this.usuarios_api(data, user, password);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  usuarios_api(data, user:String, password:String) {
    let i;
    for(i=0; i<data.length; i++){
      if(data[i].usuario_admin===user && data[i].password===password){
        console.log("MUY BIEN")
        this.login_correcto=true;
        localStorage.setItem('username', data[i].usuario_admin);
        localStorage.setItem('codigo_usar', data[i].codigo_usuario);
        if(data[i].carepta!=null){
          localStorage.setItem('carpeta', data[i].carpeta);
        }
      }
    }
  }

}
