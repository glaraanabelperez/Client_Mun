import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Productos } from '../models/productos';
import { QueryDataModel } from '../models/queryDatamodel';
import { CategoryModel } from '../../protected/models/categoryModel';

@Injectable({
  providedIn: 'root'
})
export class ProtectedService{

 

  public product:Productos;
  
  estadoForm: String[]=['Activada', 'Desactivada'];

  url='https://localhost:44372/api/';
  url2='http://localhost/Users/Lara/source/repos/menu-practica/src/';
  // url='/php-app/';
  // url2='/';
  
  constructor(private http: HttpClient) { 
  
  }

  public listAllProducts(userId:number, data:QueryDataModel): Observable<any[]> {
    return this.http.post<any []>(`${this.url}product`, data);
  }

  public obtenerCategoria(userId:number): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel []>(`${this.url}category/list/${userId}`);
  }

  eliminar(p){
    return  this.http.post(`${this.url}eliminar.php`, JSON.stringify(p) );
  }

  insertarDatos(p){
    return  this.http.post(`${this.url}insertar.php`, JSON.stringify(p));
  }
  editarDatos(p){
    return  this.http.post(`${this.url}editar.php`, JSON.stringify(p));
  }

  changePrice(pricePercent:number, codigo_user:any){
    console.log( pricePercent, codigo_user)
    var data={
      percent:pricePercent,
      user_id:codigo_user
    }
    return  this.http.post(`${this.url}changePrice.php`, JSON.stringify(data));
  }
  //CONSULTAS SERVIDOR
  guardarArchivoServidor(datos){
    return  this.http.post(`${this.url2}insertarArchivoServidor.php`, datos);
  }

  borrarArchivoServidor(datos){
    return  this.http.post(`${this.url2}borrarArchivoServidor.php`, JSON.stringify(datos));
  }

  existeImgServidor(datos){
    return  this.http.post(`${this.url2}verificar_imagen_servidor.php`, datos);
  }
  
  guardarCarpeta(c){
    return  this.http.post(`${this.url2}carpeta.php`, JSON.stringify(c));
  }
  
  
}