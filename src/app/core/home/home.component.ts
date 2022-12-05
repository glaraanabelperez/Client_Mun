import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { CategoryModel } from '../products/categories/models/categoryModel';
import { CatgeorieService } from '../products/categories/service/categorie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  categorias: CategoryModel[];


  constructor(private serviceCategorias:CatgeorieService, public loadingService:LoadingService){
  }
  
  ngOnInit(): void {
    this.getAllMarcasActive();
  }
  public getAllMarcasActive(){
    this.loadingService.setLoading(true);
    this.serviceCategorias.list().subscribe(
      res=>{
        this.loadingService.setLoading(false);
        this.categorias=res as CategoryModel[];
      }, 
      error=>{
        this.loadingService.setLoading(false);
      }
    )
  }
       

 
  
   


}