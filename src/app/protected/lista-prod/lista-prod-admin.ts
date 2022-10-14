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
// import { CategoryyService } from 'src/app/core/services/category.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ProductService } from 'src/app/core/services/product.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'lista-prod-admin',
    templateUrl: './lista-prod-admin.html',
    styleUrls: ['./lista-prod-admin.scss']
  })

  export class ListaProdAdmin implements OnInit {

    @Output() emitProduct;
    
    public user;

    public products:any[]=[];
    public categories:CategoryModel[];
    // public imgDefecto:string;

    //Filtros
    public subsChangeFilters: Subscription;
    public filter:Filter = new Filter();
    public order:OrderField;
    public orderKeys=[];

    public orderAsc:boolean; 
    public from:number=0;
    public lenght:number=10;
    public recordCount: any;
    public currentPage = 1;
    public countPages=1

    @ViewChild(NgForm) myForm: NgForm; 
  

        

    constructor( private productService:ProductService, public loadingService:LoadingService, private router: Router) {

        this.user=localStorage.getItem('username')       
        this.emitProduct=new EventEmitter();
        this.orderKeys=Object.keys(OrderField);
      console.log(this.order)
     }
     
    ngOnInit(): void {
      this.filter.UserId=parseInt(localStorage.getItem('codigo_usar'),10)  
      this.traerCategorias();  
      
      console.log(this.filter)
    }

    ngAfterViewInit() {

      this.subsChangeFilters = this.productService.changeFilters$.subscribe(() => this.listAllProducts())
      this.onChangesFilters();

    }

    // Filtros
    onChangesFilters(): void {
          this.myForm.valueChanges.subscribe(() => {
            console.log(this.filter)
            console.log(this.order)
              this.productService.setFilters(this.filter, this.order, this.from, this.lenght, this.orderAsc);
              this.productService.ChengeFilters();
          });
    }
 
    listAllProducts(){
   
      this.loadingService.setLoading(true);
        this.productService.listAllProducts().subscribe(
          res=>{
            this.products=res['Data'];
            this.recordCount=res['RecordsCount'];
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

     //lista categorias
    traerCategorias(){
      if(localStorage.getItem('codigo_usar')==undefined || localStorage.getItem('codigo_usar')==null){
        alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
        this.router.navigateByUrl('login')
      }
        this.productService.listCategories(parseInt(localStorage.getItem('codigo_usar'),10)).subscribe(
          res=>{
            this.categories=res;
            alert('BIENVENIDO');
          },
          error=>{
            alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
          }
        );

    }

    public changePagesize(): void {
    this.countPages=this.recordCount / this.lenght;
    this.productService.ChengeFilters();
    }

  public onPageChange(pageNum: number): void {
    this.lenght = (this.lenght ) * (pageNum);
    this.from = (this.lenght ) - this.from;
    this.productService.ChengeFilters();
  }

    ngOnDestroy(): void {
      this.subsChangeFilters.unsubscribe();
    }

}
  
  