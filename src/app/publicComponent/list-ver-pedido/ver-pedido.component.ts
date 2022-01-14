import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  pedidosTodos:Pedidos[];

  constructor( public _service:ServicePedidos, private _location: Location, public _service_metodos:ServiceMetodos) { 
    this.pedidosTodos=this._service.obtenerPedido();
    window.scroll(0,0);
  }

  ngOnInit(): void {}

  back() {
    this._location.back();
  }
  eliminar(c){
    console.log("index", c);
    this._service.eliminarPedido(c);
    this.pedidosTodos=this._service.obtenerPedido();
  }
  sumar(c){
    console.log(c);
    this._service.sumarCantidad(c);
    this.pedidosTodos=this._service.obtenerPedido();
  }
  restar(c){
    this._service.restarCantidad(c);
    this.pedidosTodos=this._service.obtenerPedido();
  }

  finalizarPedido(){
    let p :any []=[];
    this._service.pe.forEach(element=>p.push(element))
    let pedido=(JSON.stringify(p)).replace(/["{}]+/g, " ");
    this._service.pe.clear();
    window.location.href="https://api.whatsapp.com/send?phone=" + this._service_metodos.negocio.telefono + "&text=" + pedido;
  }

}
