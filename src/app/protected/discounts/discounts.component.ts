import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CatgeorieService } from 'src/app/core/services/categorie.service';
import { CategoryModel } from 'src/app/core/models/categoryModel';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DiscountModel } from 'src/app/core/models/discountModel';
import { DiscountService } from 'src/app/core/services/discount.service';



@Component({
    selector: 'app-discounts',
    templateUrl: './discounts.component.html',
    styleUrls: ['./discounts.component.scss']
  })

  export class DiscountComponent implements OnInit {

 
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
    this.showModal=this.showModal ? false : true;
  } 


   //lista categorias
   public getDiscounts(){
      this.discountService.getAllDiscounts().subscribe(
        res=>{
          this.discounts=res;
          this.loadingService.setLoading(false);
          alert('BIENVENIDO');
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
          alert('BIENVENIDO');
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }
    
}
  
  