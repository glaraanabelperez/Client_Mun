import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Categorias } from '../models/categorias';
import { Negocio } from '../models/Negocio';
import { Publicaciones } from '../models/publicaciones';
import { ServiceGeneral } from './service-general.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceMetodos {

  negocio:Negocio;
  negocios_todos:Negocio []=[];
  publicaciones :Publicaciones[]=[];
  categorias: Categorias[]=[];
  categoriaElegida2:Categorias;
  categoriaSubject:Subject <Categorias> = new  Subject <Categorias>();

  constructor(public service_g: ServiceGeneral) {

      this.categoriaSubject.subscribe((value) =>{
        this.categoriaElegida2=value;
      })
  }

  setNegocio(negocio: Negocio) {
    this.negocio=negocio;
    console.log("aca", this.negocio)

  }
  obtenerCategoria(codigo_usuario){
    this.service_g.obtener_categoria(codigo_usuario).subscribe(res => {
      this.filtrar_categoria(res);
    });
  }
  filtrar_categoria(data){
    for(let i=0;i<data.length;i++){
      this.categorias.push(data[i]);
      this.categorias.values.toString;    
    }
  }
  traerDatosPublicaciones_servicio(codigo){
    this.service_g.traerDatos(codigo).subscribe(res => {
      this.mostrarDatosPublicaciones(res);
   })
  }
  mostrarDatosPublicaciones(res:[]){
    if(res.length!=0){
      for(let i=0;i<res.length;i++){
        this.publicaciones.push(res[i]);
        this.publicaciones.values.toString;
      }
    }
  }
   setCatgeoriasElegida(c){
    this.categoriaElegida2=c;
  }
  suscribeOnChange(c){
      this.categoriaSubject.next(c);
  }
  getCategroiaElegida(){
    return this.categoriaElegida2;
  }

}