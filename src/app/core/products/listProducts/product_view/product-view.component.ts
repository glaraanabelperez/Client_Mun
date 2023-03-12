import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from '../service/product.service';
import { ProductModelResponse } from '../models/productModelResponse';
import { OrderService } from 'src/app/orders/service/order.service';
import { Order } from 'src/app/orders/models/Order';

@Component({
    selector: 'app-productView',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss']
  })

  export class ProductViewComponent implements OnInit
  {

  @Output() close = new EventEmitter<any>();
  @Input() productIdToModel:number;
  product: ProductModelResponse=null;
  imageArray: string[];
  imageArray2: string;

  constructor(
    public loadingService:LoadingService, private productService:ProductService,private _serviceOrder:OrderService,

    ){
    
  }
     
ngOnInit(): void {
  this.getProduct(this.productIdToModel);     
}

ngAfterViewInit(){
}

clean(){
}

onCloseModal(): void {
  this.close.emit();
}

public addToCar(p:ProductModelResponse){
  let pedido:Order={
    nameImage:p.ImageName,
    categoryName: p.CategoryName,
    marcaName: p.MarcaName,
    productId: p.ProductId,
    count: 1,
    name: p.Name,
    price: p.Price,
    priceWithDiscount: p.PriceWithDiscount,
    priceTotal: p.PriceWithDiscount,
    discount: p.DiscountAmount      
  }
  this._serviceOrder.agregarPedido(pedido);
  this.onCloseModal();
}

getProduct(productId :number){
  this.loadingService.setLoading(true);
  
  this.productService.ProductToCard(productId).subscribe(
    res=>{
      this.product=res as ProductModelResponse; 
      if(this.product.ImageName!=null){
        this.imageArray=this.product.ImageName.split("-");
        this.imageArray.shift()
      }
      this.loadingService.setLoading(false);
    },
    error=>{
      alert('HUBO UN PROBLEMA CON EL SERVIDOR');
      this.loadingService.setLoading(false);
    }
  );
  this.loadingService.setLoading(false);
}





}
  
  