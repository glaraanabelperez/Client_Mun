import { Component, Input, OnInit} from '@angular/core';
import { Negocio } from 'src/app/core/models/Negocio';
import { ServicePedidos } from 'src/app/core/servicios-pedidos/service-pedidos.service';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { ServiceGeneral } from '../../core/servicios-generales/service-general.service';


@Component({
    selector: 'nav-component',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
  })

  export class NavComponent implements OnInit {
    @Input()negocio: Negocio;
    mostrarWhatsapp=false;
    total;

    categories:CategoryModel[];
    
    constructor( public _servicioGeneral:ServiceGeneral, public service_pedidos: ServicePedidos){
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
  