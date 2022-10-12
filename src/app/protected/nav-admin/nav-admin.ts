import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { CategoryModel } from '../models/categoryModel';
import { ProtectedService } from '../../core/services/protected.service';
import { CategoryyService } from 'src/app/core/services/category.service';


@Component({
    selector: 'nav-admin',
    templateUrl: './nav-admin.html',
    styleUrls: ['./nav-admin.scss'],
  })

  export class NavAdmin implements OnInit {

    categories:CategoryModel[];
    

    constructor(private router: Router, public categoryService:CategoryyService){
    }

    ngOnInit():void {
      this.traerCategorias();
    }

    sendCatgeory(c:CategoryModel){
        this.categoryService.setCategory(c.CategoryId);
        this.categoryService.changeCatgeory();
    }
     //CATEGORIAS NAV PROTECTED
    traerCategorias(){
      if(localStorage.getItem('codigo_usar')==undefined || localStorage.getItem('codigo_usar')==null){
        alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
        this.router.navigateByUrl('login')
      }
        this.categoryService.listCategories(parseInt(localStorage.getItem('codigo_usar'),10)).subscribe(
          res=>{
            this.categories=res;
            alert('BIENVENIDO');
          },
          error=>{
            alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
          }
        );

    }

}
  
  