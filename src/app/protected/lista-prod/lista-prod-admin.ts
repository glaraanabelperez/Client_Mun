import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, Query} from '@angular/core';
import { Productos } from 'src/app/core/models/productos';
import { DOCUMENT } from '@angular/common';
// import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { ProtectedService } from '../../core/services/protected.service';
import { QueryDataModel } from 'src/app/core/models/queryDatamodel';
import { Filter } from 'src/app/core/models/Filter';
import { OrderField } from 'src/app/core/models/OrderField';
import { ServiceGeneral } from 'src/app/core/services/service-general.service';


@Component({
    selector: 'lista-prod-admin',
    templateUrl: './lista-prod-admin.html',
    styleUrls: ['./lista-prod-admin.scss']
  })

  export class ListaProdAdmin implements OnInit {

    @Output() emitProduct;
    @Input() categoryInput:CategoryModel;

    imgDefecto:string;
    products:any[]=[];
    temp;
    user;

    constructor( private _serviceProtected:ProtectedService, public _service_general:ServiceGeneral) {
        this.user=localStorage.getItem('username')
        this.emitProduct=new EventEmitter();
     }
     
    ngOnInit(): void {
      var data= new QueryDataModel();
      var filter= new Filter();
      // filter.CategoryId=4;
      data.Filter=filter;
      data.OrderField=OrderField.price;
      data.From=0;
      data.Length=10;
      this.listAllProducts(data);
    }

    

    listAllProducts(data:QueryDataModel){
      this._service_general.setLoading(true);
        this._serviceProtected.listAllProducts(parseInt(localStorage.getItem('codigo_usar'),10), data).subscribe(
          res=>{
            this.products=res['Data'];
            console.log(this.products)
          },
          error=>{
            alert('NO SE ECNUENTRAN RESULTADOS');
          }
        );
        this._service_general.setLoading(false);

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

}
  
  