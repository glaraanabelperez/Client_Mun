import { Component } from '@angular/core';
import { OrderService } from './orders/service/order.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {


  constructor(public _serviceOrder:OrderService){ }

  ngOnInit(): void {

  }

  subir(){
    window.scroll(0,0)
  }

  public getShowModal():boolean{
    return this._serviceOrder.showModal
  }

  public closeModal(){
     this._serviceOrder.setShowingModal();
  }
  
}
