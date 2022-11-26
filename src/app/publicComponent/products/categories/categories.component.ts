import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { CatgeorieService } from './service/categorie.service';
import { CategoryModel } from './models/categoryModel';



@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
  })

  export class CategoriesComponent implements OnInit {

 
  public category: CategoryModel;
  public categories:CategoryModel[]=[];
  public showModal:boolean;

  constructor(private router: Router,private categorieService:CatgeorieService, public loadingService:LoadingService, ){}

  ngOnInit(): void {
    this.getCategorias();
  }

  showingModal(item:CategoryModel):void{
    this.category = item;
    if(!this.showModal){
      this.showModal=true;
      window.scroll(0,0);
    }else{
      this.showModal=false;
      this.getCategorias();
    }
  } 


   //lista categorias
   public getCategorias(){
      this.categorieService.list().subscribe(
        res=>{
          this.categories=res;
          this.loadingService.setLoading(false);
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }

  public delete(categoryId:number){
      this.categorieService.delete(categoryId).subscribe(
        res=>{
          this.loadingService.setLoading(false);
          alert('LOS DATOS SE ELIMINARON CON EXITO');
          this.getCategorias();
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }
    
}
  
  