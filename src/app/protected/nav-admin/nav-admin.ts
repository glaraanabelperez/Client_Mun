import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { CategoryModel } from '../models/categoryModel';
import { ProtectedService } from '../../core/services/protected.service';


@Component({
    selector: 'nav-admin',
    templateUrl: './nav-admin.html',
    styleUrls: ['./nav-admin.scss'],
  })

  export class NavAdmin implements OnInit {

    categories:CategoryModel[];
    
    @Output() onClicked:EventEmitter<CategoryModel>;

    constructor(private router: Router, public _serviceProtected : ProtectedService,){
        this.onClicked=new EventEmitter();
    }

    ngOnInit():void {
      this.traerCategorias();
    }

    emit(c:CategoryModel){
        this.onClicked.emit(c);
        return false;
      }
     //CATEGORIAS NAV PROTECTED
    traerCategorias(){
      if(localStorage.getItem('codigo_usar')==undefined || localStorage.getItem('codigo_usar')==null){
        alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
        this.router.navigateByUrl('login')
      }
        this._serviceProtected.obtenerCategoria(parseInt(localStorage.getItem('codigo_usar'),10)).subscribe(
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
  
  