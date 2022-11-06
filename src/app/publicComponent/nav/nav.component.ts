import { Component, Input, OnInit} from '@angular/core';
import { ServicePedidos } from 'src/app/publicComponent/products/orders/servicios-pedidos/service-pedidos.service';
import { CategoryModel } from 'src/app/publicComponent/products/categories/models/categoryModel';


@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
  })

  export class NavComponent implements OnInit {
    mostrarWhatsapp=false;
    total;

    categories:CategoryModel[];
    
    constructor(public service_pedidos: ServicePedidos){
    }

    ngOnInit():void {
      this.total=this.service_pedidos.mostrarTotal();
      this.service_pedidos.contadorSubject.subscribe((value)=>{
      this.total=value;
      })
    }
   
      
    elegido(d :CategoryModel){
      // this._service_metodos.setCatgeoriasElegida(d);
      // this._service_metodos.suscribeOnChange(d);
      console.log("categoria Elegida", d)
    }

}
  