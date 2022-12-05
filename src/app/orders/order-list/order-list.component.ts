import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Location} from '@angular/common';
import { OrderService } from '../service/order.service';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderList implements OnInit {

  @Output() closeModal = new EventEmitter();

  constructor( public _serviceOrder:OrderService, private _location: Location) { 
  }

  ngOnInit():void {
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }

  eliminar(c){
    this._serviceOrder.eliminarPedido(c);
  }

  sumar(c){
    this._serviceOrder.sumarCantidad(c);
  }

  restar(c){
    this._serviceOrder.restarCantidad(c);
  }

  finalizarPedido(){
    let p :any []=[];
    let pedido=(JSON.stringify(this._serviceOrder.order)).replace(/["{}]+/g, " ");
    this._serviceOrder.order=[];
    // window.location.href="https://api.whatsapp.com/send?phone=" + this._service_metodos.negocio.telefono + "&text=" + pedido;
  }

}
