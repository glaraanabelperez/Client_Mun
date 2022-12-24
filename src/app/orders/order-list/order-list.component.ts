import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Location} from '@angular/common';
import { OrderService } from '../service/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { ItemsBuy } from '../models/ItemsBuy';
import { get } from 'scriptjs';

const FORM_ID = 'payment-form';


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

  constructor( public _serviceOrder:OrderService, private readonly formBuilder : FormBuilder,   public loadingService:LoadingService) { 
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

  // finalizarPedido(){
  //   let p :any []=[];
  //   let pedido=(JSON.stringify(this._serviceOrder.order)).replace(/["{}]+/g, " ");
  //   this._serviceOrder.order=[];
  //   // window.location.href="https://api.whatsapp.com/send?phone=" + this._service_metodos.negocio.telefono + "&text=" + pedido;
  // }


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

  // public procesPayment(){
  //   this._serviceOrder.order.forEach(element => {
      
  //   });
  // }


  public procesPayment(){
    let p: ItemsBuy[] = [
      { Title: "p1",
        Quantity: 1,
        Price: 12 
      },
      { Title: "p2",
        Quantity: 2,
        Price: 12 
      }
    ]


    this.loadingService.setLoading(true);
        this._serviceOrder.processPayment(p).subscribe(
          res=>{
            console.log(res["InitPoint"], res)

            this.loadingService.setLoading(false);
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src =`${res["InitPoint"]}`;
            script.setAttribute('data-preference-id', res);
            const form = document.getElementById(FORM_ID);
            form.appendChild(script);
          },
          error=>{
            alert('ERROR DE SERVIDOR');
            this.loadingService.setLoading(false);
          }
        );

  }

  public getPaymentMethods(){

    this.loadingService.setLoading(true);
        this._serviceOrder.getMethodsPayment().subscribe(
          res=>{
          
           console.log(res);
          },
          error=>{
            alert('ERROR DE SERVIDOR');
            this.loadingService.setLoading(false);
          }
        );

  }

}
