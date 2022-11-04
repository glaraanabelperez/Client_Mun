import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CatgeorieService } from 'src/app/core/services/categorie.service';
import { CategoryModel } from 'src/app/core/models/categoryModel';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DiscountModel } from 'src/app/core/models/discountModel';
import { DiscountService } from 'src/app/core/services/discount.service';
import { MarcaModel } from 'src/app/core/models/marcaModel';
import { MarcaService } from 'src/app/core/services/marca.service';



@Component({
    selector: 'app-marcas',
    templateUrl: './marcas.component.html',
    styleUrls: ['./marcas.component.scss']
  })

  export class MarcasComponent implements OnInit {

 
  public marca: MarcaModel;
  public marcas:MarcaModel[]=[];
  public showModal:boolean;

  constructor(private router: Router,private marcaService:MarcaService, 
    public loadingService:LoadingService, ){}

  ngOnInit(): void {
    this.getDiscounts();
  }

  showingModal(item:MarcaModel):void{
    this.marca = item;
    this.showModal=this.showModal ? false : true;
  } 


   //lista categorias
   public getDiscounts(){
      this.marcaService.getAllMarcas().subscribe(
        res=>{
          this.marcas=res;
          this.loadingService.setLoading(false);
          alert('BIENVENIDO');
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }

  public delete(marcaId:number){
      this.marcaService.delete(marcaId).subscribe(
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
  
  