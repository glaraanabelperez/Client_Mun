import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemsBuy } from '../models/ItemsBuy';
import { Order } from '../models/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _showModal = new BehaviorSubject<boolean>(false);
  public showModal;

  public total=0;
  public totalSubject:Subject <any> = new  Subject <any>(); //avisar que total cambio...
  public order:Order[]=[];

  public totalFact=0;
  public totalFactSubject:Subject <any> = new  Subject <any>(); //avisar que total cambio...

  public url=environment.Url;


  constructor(private http: HttpClient) { 
    this._showModal.subscribe(x => this.showModal=x); //modifica y avisa que showModel cambio
    
  }

  setShowingModal():void{
    console.log(this.showModal)
    if(!this.showModal){
      this._showModal.next(true);
      window.scroll(0,0);
    }else{
      this._showModal.next(false);
    }
  } 
 

  agregarPedido(p){
      if(this.corroborarProductoEnPedido(p)){
        alert("PARA SUMAR UNIDADES ACCEDA AL CARRITO")
      }else{
        this.order.push(p);
        this.showModal=true;
        this.calcularTotal(+1);
        this.total_suscribeOnChange();
      }
      this.procesTotal()
  }

    corroborarProductoEnPedido(p :Order):boolean{
      let rsta=false;
      for (var o of this.order) {
        if(p.productId==o.productId){
          rsta=true;
          return rsta;
        }
      }
    }

    calcularTotal(cant:number){
      this.total+=cant;
    }

    total_suscribeOnChange(){
      this.totalSubject.next(this.total);
    }

    totalFact_suscribeOnChange(){
      this.totalFactSubject.next(this.totalFact);
    }

    eliminarPedido(i){
      this.calcularTotal(-this.order[i].count)
      this.order.splice(i, 1);
      this.total_suscribeOnChange();
      this.procesTotal()
    }

    mostrarTotal(){
      return this.total;
    }

    restarCantidad(i){
      this.order[i].count-=1;
      this.calcularTotal(-1);
      if(this.order[i].count===0){
        this.eliminarPedido(i);
      }
      this.total_suscribeOnChange();
      this.procesTotal()
    }

    sumarCantidad(i){
      this.order[i].count+=1;
      this.calcularTotal(+1);
      this.total_suscribeOnChange();
      this.procesTotal()
    }

    procesTotal(){
      this.totalFact=0;
      this.order.forEach(element => {
        this.totalFact+=(element.price*element.count)
      });
      this.totalFact_suscribeOnChange();
    }

    processPayment(itemsBuy: ItemsBuy):Observable<any>{
      return this.http.post<any>(`${this.url}payments/post`, itemsBuy );
    }

    getMethodsPayment():Observable<any>{
      return this.http.get<any>(`${this.url}payments/paymentsMethods` );
    }
   

  }
  