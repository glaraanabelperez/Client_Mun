import { Component } from '@angular/core';
import { OrderService } from 'src/app/orders/service/order.service';
import { MarcaModel } from '../products/marcas/models/marcaModel';
import { MarcaService } from '../products/marcas/service/marca.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {

  show:boolean;
  marcas: MarcaModel[];
  showDropdown: boolean;

  constructor( private servicesMarcas:MarcaService, private _serviceOrder:OrderService){
  }
  
  ngOnInit(): void {
    this.getAllMarcasActive();
  }
  public getAllMarcasActive(){
    this.servicesMarcas.getMarcas().subscribe(
      res=>{
        this.marcas=res as MarcaModel[];
      }, 
      error=>[
 
      ]
    )
  }

  public showNav(){
    this.show=this.show ? false : true;
  }

  public showList(){
    this.showDropdown=this.showDropdown ? false : true;
  }

  public getTotal():number{
    return this._serviceOrder.total;
  }

  public setShowModalOrder(){
    this._serviceOrder.setShowingModal();
  }

}