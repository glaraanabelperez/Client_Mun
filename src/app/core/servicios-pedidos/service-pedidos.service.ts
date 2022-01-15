import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicePedidos {

  total=0;
  contadorSubject:Subject <any> = new  Subject <any>();
  order:any[]=[];

  constructor() { 
  }

    agregarPedido(p){
      if(this.corroborarProductoEnPedido(p)){
        alert("PARA SUMAR UNIDADES ACCEDA AL CARRITO")
      }else{
        this.order.push(p);
        this.calcularTotal(+1);
        this.contador_suscribeOnChange();
      }
    }

    corroborarProductoEnPedido(p):boolean{
      let rsta=false;
      for (var o of this.order) {
        if(p.codigo_producto==o.codigo_producto){
          rsta=true;
          return rsta;
        }
      }
    }

    calcularTotal(n:number){
      this.total+=n;
    }

    contador_suscribeOnChange(){
      this.contadorSubject.next(this.total);
    }

    eliminarPedido(i){
      this.calcularTotal(-this.order[i].cantidad)
      this.order.splice(i, 1);
      this.contador_suscribeOnChange();
    }

    mostrarTotal(){
      return this.total;
    }

    restarCantidad(i){
      this.order[i].cantidad-=1;
      this.calcularTotal(-1);
      if(this.order[i].cantidad===0){
        this.eliminarPedido(i);
      }
      this.contador_suscribeOnChange();
    }

    sumarCantidad(i){
      this.order[i].cantidad+=1;
      this.calcularTotal(+1);
      this.contador_suscribeOnChange();
    }
   

  }
  