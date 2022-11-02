import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { CatgeorieService } from 'src/app/core/services/categorie.service';
import { CategoryModel } from 'src/app/core/models/categoryModel';
import { LoadingService } from 'src/app/core/services/loading.service';



@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
  })

  export class CategoriesComponent implements OnInit {

 
  public category: CategoryModel;
  public categories:CategoryModel[]=[];

  constructor(private router: Router,private categorieService:CatgeorieService, public loadingService:LoadingService, ){}

  ngOnInit(): void {
    this.traerCategorias();
  }

 
  setSelectedItem(item:CategoryModel) {
    this.category = item;
    console.log(this.category, "acacac")
  }

   //lista categorias
   public traerCategorias(){
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
          alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
        }
      );

  }

  public deleteCategoria(categoryId:number){
    if(localStorage.getItem('codigo_usar')==undefined || localStorage.getItem('codigo_usar')==null){
      alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
      this.router.navigateByUrl('login')
    }
      this.categorieService.deleteCategory(categoryId).subscribe(
        res=>{
         console.log(res)
          this.loadingService.setLoading(false);
          alert('BIENVENIDO');
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
        }
      );

  }
    
}
  
  