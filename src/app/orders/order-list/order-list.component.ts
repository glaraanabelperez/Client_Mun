import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Location} from '@angular/common';
import { OrderService } from '../service/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderList implements OnInit {

  @Output() closeModal = new EventEmitter();

  public _delivery: boolean=false;
  public direction_delivery: string;
  public formOrder : FormGroup;
  constructor( public _serviceOrder:OrderService, private readonly formBuilder : FormBuilder) { 
    this.formOrder = this.formBuilder.group({
      direction : ["", [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
     });
  }

  ngOnInit():void {
  }

  get f(){return this.formOrder.controls;}

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


  public finishOrder(){
    if(this.direction_delivery==null || this.direction_delivery==""){
      alert("LA DIRECCION NO PUEDE ESTAR VACIA");
    }else{
      console.log(this.direction_delivery)
        
    }

  }

  public pickUp(){
    this.direction_delivery="Retiro en Local"
  }

  public onItemChange(value){
    this.formOrder.controls['direction'].setValue(value);
    this.direction_delivery=this.formOrder.get('direction').value;
  }

}
