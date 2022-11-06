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
    this.showModal=this.showModal ? false : true;
  } 


   //lista categorias
   public getCategorias(){
    if(localStorage.getItem('codigo_usar')==undefined || localStorage.getItem('codigo_usar')==null){
      alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
      this.router.navigateByUrl('login')
    }
      this.categorieService.listCategories().subscribe(
        res=>{
          this.categories=res;
          this.loadingService.setLoading(false);
          alert('BIENVENIDO');
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }

  public delete(categoryId:number){
    if(localStorage.getItem('codigo_usar')==undefined || localStorage.getItem('codigo_usar')==null){
      alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
      this.router.navigateByUrl('login')
    }
      this.categorieService.deleteCategory(categoryId).subscribe(
        res=>{
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
  
  