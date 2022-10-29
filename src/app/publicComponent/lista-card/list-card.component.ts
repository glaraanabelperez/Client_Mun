import { Component, OnInit , EventEmitter, Output, Input} from '@angular/core';
import { ProductModel } from 'src/app/core/models/productModel';
import { ServiceGeneral } from '../../core/services/service-general.service';
import { ServicePedidos } from '../../core/servicios-pedidos/service-pedidos.service';



@Component({
    selector: 'list-card-component',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.scss']
  })
  export class ListCardComponent implements OnInit {
    @Output() onClicked:EventEmitter<ProductModel>;

    // categoriaElegida:Categorias;
    
    constructor(private _servicio:ServiceGeneral, private _servicioPedidos:ServicePedidos) {
        window.scroll(0,0);
      }
     
     ngOnInit(): void {
      // this.categoriaElegida=this._servicio_metodos.getCategroiaElegida();
      // this.categoriaElegidass();
      // this.onClicked=new EventEmitter();
    }

    categoriaElegidass(){
      // this._servicio_metodos.categoriaSubject.subscribe((value)=>{
      //   this.categoriaElegida=value;
      //   console.log("suscripcion", this.categoriaElegida)
      // })
    }

    agregarPedido(p){
        let pedido={
        nombreImagen:p.nombreImagen,
        codigo_producto: p.id,
        cantidad:1,
        titulo:p.titulo,
        precio:p.precio,
      }
        this._servicioPedidos.agregarPedido(pedido);
    }
    verCard(p :ProductModel){
      this._servicio.setObjetoParaCardProd(p);
    } 

}
  
  