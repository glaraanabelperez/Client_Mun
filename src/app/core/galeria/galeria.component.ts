import { Component,  OnInit} from '@angular/core';
import { ProductModel } from 'src/app/core/products/listProducts/models/productModel';
import { OrderService } from 'src/app/orders/service/order.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from '../products/listProducts/service/product.service';
import { Order } from '../../orders/models/Order';
import { ProductModelResponse } from '../products/listProducts/models/productModelResponse';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {
  destacada :ProductModelResponse[] = [];

  constructor(public serviceProducts:ProductService, public _serviceOrder:OrderService, 
    public loadingService:LoadingService) {
      this.traerDestacadas();
      console.log("aca")
   }
   
  ngOnInit(): void {
  }

  traerDestacadas(){
    this.loadingService.setLoading(true);

      this.serviceProducts.getProductfeatured().subscribe(
        res=>{
          this.destacada=res as ProductModelResponse [];
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
  agregarPedido(p:ProductModelResponse){

    let pedido:Order={
      productId: p.ProductId,
      categoryName:p.CategoryName,
      marcaName:p.MarcaName,
      name: p.Name,
      nameImage:p.ImageName,
      count:1 ,
      price:p.Price,
      priceWithDiscount:p.PriceWithDiscount,
      priceTotal:p.PriceWithDiscount,
      discount:p.DiscountAmount,
  }
  this._serviceOrder.agregarPedido(pedido);
}

}
