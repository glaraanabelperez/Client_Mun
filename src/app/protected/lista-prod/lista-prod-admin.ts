import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, Query} from '@angular/core';
import { Productos } from 'src/app/core/models/productos';
import { DOCUMENT } from '@angular/common';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { ProtectedService } from '../../core/services/protected.service';
import { QueryDataModel } from 'src/app/core/models/queryDatamodel';
import { Filter } from 'src/app/core/models/Filter';
import { OrderField } from 'src/app/core/models/OrderField';
import { ServiceGeneral } from 'src/app/core/services/service-general.service';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/core/services/service-general.metodos';
import { CategoryyService } from 'src/app/core/services/category.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ProductService } from 'src/app/core/services/product.service';


@Component({
    selector: 'lista-prod-admin',
    templateUrl: './lista-prod-admin.html',
    styleUrls: ['./lista-prod-admin.scss']
  })

  export class ListaProdAdmin implements OnInit {

    @Output() emitProduct;

    data:QueryDataModel = new QueryDataModel();
    filter:Filter = new Filter();
    subs: Subscription;

    imgDefecto:string;
    products:any[]=[];
    temp;
    user;

    constructor( private productService:ProductService, public loadingService:LoadingService, 
      private categoryService:CategoryyService ) {

        this.user=localStorage.getItem('username')
        this.emitProduct=new EventEmitter();
     }
     
    ngOnInit(): void {
      
      this.listAllProducts();
      this.subs = this.categoryService.changeCategory$.subscribe(() => this.listAllProducts())

    }


 
    listAllProducts(){
      this.setFilters();    
      console.log(this.data)
      this.loadingService.setLoading(true);
        this.productService.listAllProducts(parseInt(localStorage.getItem('codigo_usar'),10), this.data).subscribe(
          res=>{
            this.products=res['Data'];
            console.log(this.products)
          },
          error=>{
            alert('NO SE ECNUENTRAN RESULTADOS');
          }
        );
        this.loadingService.setLoading(false);

    }
  
    edit(p){   
      this.emitProduct.emit(p);
      return false;
    }

    eliminar(p){
      // this._servicioGeneral.eliminar(p).subscribe(
      //   datos=>{
      //     if(datos['resultado']=='OK'){
      //       alert("SE ELIMINO EXITOSAMENTE")
      //     }else{ 
      //       alert("ERROR DE CONEXION")
      //     }
      //   }
      // );   
      // this.document.location.reload(); 
    }

    setFilters(){
      this.filter.CategoryId=this.categoryService.getCategorySelected();
      console.log(this.filter.CategoryId)

      this.data.Filter=this.filter;
      this.data.OrderField=OrderField.price;
      this.data.From=0;
      this.data.Length=10;
    }

}
  
  