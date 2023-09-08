import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Location} from '@angular/common';
import { OrderService } from '../service/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { ItemsBuy } from '../models/ItemsBuy';



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
  goPay: any;
  public goPayShow:boolean=false;

  constructor( public _serviceOrder:OrderService, private readonly formBuilder : FormBuilder,   public loadingService:LoadingService) { 
    // this.formOrder = this.formBuilder.group({
    //   Name: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
    //   LastName: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
    //   DirectionName: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
    //   DirectionNumber: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
    //   DirectionLocation: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
    //   PhoneArea: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(2)]],
    //   PhoneNumber: ["", [Validators.required, Validators.maxLength(20), Validators.minLength(2)]],
    //   Email: ["", [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
    //   IdentificationType: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(2)]],
    //   IdentificationNumber: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
    //  });
  }

  ngOnInit():void {
 
  }

  // get f(){return this.formOrder.controls;}

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


  public cancelPayment(){
    this.goPay=null;
    this.goPayShow=false;
  }

  public procesPayment(){

    let items: ItemsBuy[]=[];
    this._serviceOrder.order.forEach(e => {
      var price=0;
      if(e.priceWithDiscount!=null){
        price=e.priceWithDiscount
      }else{
        price=e.price
      }
      let i={
        Id:e.productId,
        Title: e.name +" /id: " + e.productId ,
        Quantity: e.count,
        Price: price
      }
      items.push(i);
    });

    // let p: ItemsBuy[] = [
    //   {  Id:1,
    //     Title: "p1",
    //     Quantity: 1,
    //     Price: 5 
    //   },
    //   { Id:1,
    //     Title: "p2",
    //     Quantity: 2,
    //     Price: 2 
    //   }
    // ]

    this.loadingService.setLoading(true);
    this._serviceOrder.processPayment(items).subscribe(
          res=>{
            this.goPay=res["InitPoint"]
            this.goPayShow=true;
            this.loadingService.setLoading(false);
          },
          error=>{
            alert('ERROR DE SERVIDOR');
            this.loadingService.setLoading(false);
          }
    );
  }

  public deleteOrder(){
    this.goPayShow=false;
    this._serviceOrder.order=[];
    this._serviceOrder.total=0;
    this._serviceOrder.totalFact=0;
  }

  public getPaymentMethods(){
    this.loadingService.setLoading(true);
        this._serviceOrder.getMethodsPayment().subscribe(
          res=>{
          
          },
          error=>{
            alert('ERROR DE SERVIDOR');
            this.loadingService.setLoading(false);
          }
        );

  }

}
