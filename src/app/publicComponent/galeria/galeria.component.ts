import { Component,  OnInit} from '@angular/core';
import { ProductModel } from 'src/app/publicComponent/products/listProducts/models/productModel';
import { ServicePedidos } from 'src/app/publicComponent/products/orders/servicios-pedidos/service-pedidos.service';
import { ProductService } from '../products/listProducts/service/product.service';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {
  destacada :ProductModel[] = [];

  constructor(public serviceProducts:ProductService) {
    this.traerDestacadas();
   }
   
  ngOnInit(): void {
  }

  traerDestacadas(){
      this.serviceProducts.getProductfeatured().subscribe(
        res=>{
          this.destacada=res as ProductModel [];
          console.log(res)
        },
        error=>{
          
        }
      )
  }

  mostrarDestacadas(res:[]){
    if(res.length!=0){
      for(let i=0;i<res.length;i++){
        this.destacada.push(res[i]);
        this.destacada.values;
       }
    }
     
  }
  agregarPedido(p){
    let pedido={
    codigo_producto: p.codigo_producto,
    cantidad:1,
    titulo:p.titulo,
    precio:p.precio,
  }
    // this._servicioPedidos.agregarPedido(pedido);
}

}
