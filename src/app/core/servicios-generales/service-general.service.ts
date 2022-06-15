import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Publicaciones } from '../models/publicaciones';

@Injectable({
  providedIn: 'root'
})
export class ServiceGeneral {

  estadoForm: String[]=['Activada', 'Desactivada'];
  publicacionParaScreenShot:Publicaciones;
  objetoParaElCardProd:Publicaciones;

  verPedido:boolean;
  verPedidoSubject:Subject <boolean> = new Subject <boolean>();

  url='http://localhost/angular/mi-tienda/menu/php-app/';
  url2='http://localhost/angular/mi-tienda/menu/src/';
  // url='/php-app/';
  // url2='/';
  
  constructor(private http: HttpClient) { 
      this.verPedidoSubject.subscribe((value) =>{
        this.verPedido=value;
      })
  }

  //BBDD
  traer_usuarios(){
    return new Promise(
      resolve=>{
        this.http.get<[]>(`${this.url}select_usuarios.php`)
        .subscribe(
          data=>resolve(data)
        )
      }
    )
  }
  traerDatos(codigo){    
  return this.http.get<[]>(`${this.url}select.php?usuario=${codigo}`);
  }
  traerDestacadas(codigo){    
    return this.http.get<[]>(`${this.url}selectDestacadas.php?usuario=${codigo}`);
  } 

  obtener_categoria(codigo){
    return this.http.get<[]>(`${this.url}selectCategorias.php?usuario=${codigo}`)
  }

  obtener_estado(){
    return this.estadoForm;
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
  
  //PEDIDOS
  setVerPedido(b: boolean){
    this.verPedido=b;
  }
  suscribeOnChangePedido(b : boolean){
      this.verPedidoSubject.next(b);
  }
  getVerPedido(){
    return this.verPedido;
  }
  //MODEL PUBLICACIONES
  guardarPublicacionParaScreenShot(p){
    this.publicacionParaScreenShot=p;
  }
  obtenerDatosPubliScreenShot(){
    return this.publicacionParaScreenShot;
  }
  //VISUALIZAR CARD
  setObjetoParaCardProd(p){
    this.objetoParaElCardProd=p;
  }
  getObjetoParaCardProd(){
    return this.objetoParaElCardProd;
  }
  
}