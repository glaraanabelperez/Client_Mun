import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicePedidos {
  pe;
  total=0;
  contadorSubject:Subject <any> = new  Subject <any>();

  constructor() { 
    console.log("Servicios.P Funcionando");
    this.pe=new Map();
  }

    agregarPedido(p){
      if(this.corroborarProductoEnPedido(p)){
        alert("PARA SUMAR UNIDADES ACCEDA AL CARRITO")
      }else{
        this.pe.set(p.codigo_producto, p);
        this.total=this.contadorPedidos();
        this.contador_suscribeOnChange();
      }
    }

    sumarCantidad(c){
      let obj=this.pe.get(c);
      obj.cantidad+=1;
      this.pe.set(c, obj);
      obj=this.pe.get(c);
      this.total=this.contadorPedidos();
      this.contador_suscribeOnChange();
    }

    restarCantidad(c){
      let obj=this.pe.get(c);
      obj.cantidad-=1;
      if(obj.cantidad===0){
        this.eliminarPedido(c);
      }
      obj=this.pe.get(c);
      this.total=this.contadorPedidos();
      this.contador_suscribeOnChange();
    }

    eliminarPedido(c){
      this.pe.delete(c);
      console.log("eliminado:");
      this.total=this.contadorPedidos();
      this.contador_suscribeOnChange();
    }
    obtenerPedido(){
      const it = this.pe.values();
      return it;
    }
    corroborarProductoEnPedido(p):boolean{
      let rsta=false;
      for (var clave of this.pe.keys()) {
        if(p.codigo_producto==clave){
          rsta=true;
          return rsta;
        }
      }
    }
    contadorPedidos(){
      this.total=0;
      for (var c of this.pe.values()) {
        this.total+=c.cantidad;
        }
        return this.total;
      }
    contador_suscribeOnChange(){
      this.contadorSubject.next(this.total);
    }
    mostrarTotal(){
      return this.total;
    }

  }
  