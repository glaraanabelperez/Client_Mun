import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from '../service/product.service';
import { ProductModelResponse } from '../models/productModelResponse';

@Component({
    selector: 'app-productView-dialog',
    templateUrl: './product-view-dialog.component.html',
    styleUrls: ['./product-view-dialog.component.scss']
  })

  export class ProductViewDialogComponent implements OnInit
  {

  @Output() close = new EventEmitter<any>();
  @Input() productIdToModel:number;
  product: ProductModelResponse;
  imageArray: string[];
  imageArray2: string;

  constructor(
    public loadingService:LoadingService, private productService:ProductService, 
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

getProduct(productId :number){
  this.loadingService.setLoading(true);
  
  this.productService.ProductToCard(productId).subscribe(
    res=>{
      this.product=res; 
      this.imageArray=this.product.ImageName.split("-");
      this.imageArray.shift()
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
  
  