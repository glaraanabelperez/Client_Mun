import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CategoryModel } from '../../protected/models/categoryModel';
import { Negocio } from '../models/Negocio';
import { Productos } from '../models/productos';
import { ServiceGeneral } from './service-general.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  negocio:Negocio;
  negocios_todos:Negocio []=[];
  Productos :Productos[]=[];
  categorias: CategoryModel[]=[];
  categoriaElegida2:CategoryModel;
  categoriaSubject:Subject <CategoryModel> = new  Subject <CategoryModel>();

  constructor(public service_g: ServiceGeneral) {

      this.categoriaSubject.subscribe((value) =>{
        this.categoriaElegida2=value;
      })
  }

  setNegocio(negocio: Negocio) {
    this.negocio=negocio;

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
  traerDatosProductos_servicio(codigo){
    this.service_g.traerDatos(codigo).subscribe(res => {
      this.mostrarDatosProductos(res);
   })
  }
  mostrarDatosProductos(res:[]){
    if(res.length!=0){
      for(let i=0;i<res.length;i++){
        this.Productos.push(res[i]);
        this.Productos.values.toString;
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