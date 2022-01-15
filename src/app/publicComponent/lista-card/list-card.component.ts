import { Component, OnInit , EventEmitter, Output, Input} from '@angular/core';
import { Publicaciones } from '../../core/models/publicaciones';
import { ServiceGeneral } from '../../core/servicios-generales/service-general.service';
import { ServicePedidos } from '../../core/servicios-pedidos/service-pedidos.service';
import { Categorias } from '../../core/models/categorias';
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';



@Component({
    selector: 'list-card-component',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.scss']
  })
  export class ListCardComponent implements OnInit {
    @Output() onClicked:EventEmitter<Publicaciones>;

    categoriaElegida:Categorias;
    
    constructor(private _servicio:ServiceGeneral, private _servicioPedidos:ServicePedidos, public _servicio_metodos:ServiceMetodos) {
        window.scroll(0,0);
      }
     
     ngOnInit(): void {
      this.categoriaElegida=this._servicio_metodos.getCategroiaElegida();
      this.categoriaElegidass();
      this.onClicked=new EventEmitter();
    }

    categoriaElegidass(){
      this._servicio_metodos.categoriaSubject.subscribe((value)=>{
        this.categoriaElegida=value;
        console.log("suscripcion", this.categoriaElegida)
      })
    }

    agregarPedido(p){
        let pedido={
        nombreImagen:p.nombreImagen,
        codigo_producto: p.codigo_producto,
        cantidad:1,
        titulo:p.titulo,
        precio:p.precio,
      }
        this._servicioPedidos.agregarPedido(pedido);
    }
    verCard(p :Publicaciones){
      this._servicio.setObjetoParaCardProd(p);
    } 

}
  
  