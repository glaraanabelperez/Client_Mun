import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

import { LoadingService } from 'src/app/services/loading.service';
import { DiscountModel } from './models/discountModel';
import { DiscountService } from './service/discount.service';




@Component({
    selector: 'app-discounts',
    templateUrl: './discounts.component.html',
    styleUrls: ['./discounts.component.scss']
  })

  export class DiscountsComponent implements OnInit {

 
  public discount: DiscountModel;
  public discounts:DiscountModel[]=[];
  public showModal:boolean;

  constructor(private router: Router,private discountService:DiscountService, 
    public loadingService:LoadingService, ){}

  ngOnInit(): void {
    this.getDiscounts();
  }

  showingModal(item:DiscountModel):void{
    this.discount = item;
    if(!this.showModal){
      this.showModal=true;
      window.scroll(0,0);

    }else{
      this.showModal=false;
      this.getDiscounts();
    }
  } 


   //lista categorias
   public getDiscounts(){
      this.discountService.getActiveDiscounts().subscribe(
        res=>{
          this.discounts=res;
          this.loadingService.setLoading(false);
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }

  public delete(discountId:number){
      this.discountService.delete(discountId).subscribe(
        res=>{
         console.log(res)
          this.loadingService.setLoading(false);
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }
    
}
  
  