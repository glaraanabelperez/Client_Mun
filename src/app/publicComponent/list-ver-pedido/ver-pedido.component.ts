import { Component, Input, OnInit } from '@angular/core';
import { ServicePedidos } from '../../core/servicios-pedidos/service-pedidos.service';
import { Pedidos } from '../../core/models/Pedidos';
import {Location} from '@angular/common';
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';

@Component({
  selector: 'ver-pedido',
  templateUrl: './ver-pedido.component.html',
  styleUrls: ['./ver-pedido.component.scss']
})
export class VerPedido implements OnInit {


  constructor( public _service:ServicePedidos, private _location: Location, public _service_metodos:ServiceMetodos) { 
  }

  ngOnInit():void {
  }

  back() {
    this._location.back();
  }
  eliminar(c){
    this._service.eliminarPedido(c);
  }

  sumar(c){
    this._service.sumarCantidad(c);
  }

  restar(c){
    this._service.restarCantidad(c);
  }

  finalizarPedido(){
    let p :any []=[];
    let pedido=(JSON.stringify(this._service.order)).replace(/["{}]+/g, " ");
    this._service.order=[];
    window.location.href="https://api.whatsapp.com/send?phone=" + this._service_metodos.negocio.telefono + "&text=" + pedido;
  }

}
