import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, Query} from '@angular/core';
import { Productos } from 'src/app/core/models/productos';
import { DOCUMENT } from '@angular/common';
// import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { ProtectedService } from '../protected.service';
import { QueryDataModel } from 'src/app/core/models/queryDatamodel';
import { Filter } from 'src/app/core/models/Filter';
import { OrderField } from 'src/app/core/models/OrderField';


@Component({
    selector: 'lista-prod-admin',
    templateUrl: './lista-prod-admin.html',
    styleUrls: ['./lista-prod-admin.scss']
  })

  export class ListaProdAdmin implements OnInit {

    @Output() emitPubl = new EventEmitter();
    @Input() categoryInput:CategoryModel;

    imgDefecto:string;
    products:any[]=[];
    temp;
    user;

    constructor( private _serviceProtected:ProtectedService, @Inject(DOCUMENT) private document: Document) {
        this.user=localStorage.getItem('username')
        this.emitPubl=new EventEmitter();
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
        this._serviceProtected.listAllProducts(parseInt(localStorage.getItem('codigo_usar'),10), data).subscribe(
          res=>{
            this.products=res['Data'];
          },
          error=>{
            alert('NO SE ECNUENTRAN RESULTADOS');
          }
        );

    }
  
    sendPubl(p){
      this.emitPubl.emit(p);
      return false;
    }

    publicar(p){
      // this._servicioGeneral.guardarPublicacionParaScreenShot(p);
      // this.p=p; 
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
  
  