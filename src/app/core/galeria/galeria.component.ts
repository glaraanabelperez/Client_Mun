import { Component,  OnInit} from '@angular/core';
import { ProductModel } from 'src/app/core/products/listProducts/models/productModel';
import { OrderService } from 'src/app/orders/service/order.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from '../products/listProducts/service/product.service';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {
  destacada :ProductModel[] = [];

  constructor(public serviceProducts:ProductService, public _serviceOrder:OrderService, 
    public loadingService:LoadingService) {
    this.traerDestacadas();
   }
   
  ngOnInit(): void {
  }

  traerDestacadas(){
    this.loadingService.setLoading(true);

      this.serviceProducts.getProductfeatured().subscribe(
        res=>{
          this.destacada=res as ProductModel [];
          this.loadingService.setLoading(false);
        },
        error=>{
          this.loadingService.setLoading(false);
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
