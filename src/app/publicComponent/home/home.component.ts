import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryModel } from '../products/categories/models/categoryModel';
import { CatgeorieService } from '../products/categories/service/categorie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  categorias: CategoryModel[];


  constructor(private serviceCategorias:CatgeorieService){
  }
  
  ngOnInit(): void {
    this.getAllMarcasActive();
  }
  public getAllMarcasActive(){
    this.serviceCategorias.list().subscribe(
      res=>{
        this.categorias=res as CategoryModel[];
      }, 
      error=>[
 
      ]
    )
  }
       

 
  
   


}