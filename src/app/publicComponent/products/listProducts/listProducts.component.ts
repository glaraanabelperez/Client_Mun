import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, Query} from '@angular/core';
import { Filter } from 'src/app/publicComponent/products/listProducts/models/Filter';
import { OrderField } from 'src/app/publicComponent/products/listProducts/models/OrderField';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth.service';
import { CategoryModel } from '../categories/models/categoryModel';
import { LoadingService } from 'src/app/services/loading.service';
import { CatgeorieService } from '../categories/service/categorie.service';
import { ProductService } from './service/product.service';
import { ProductModelResponse } from './models/productModelResponse';
import { MarcaModel } from '../marcas/models/marcaModel';
import { MarcaService } from '../marcas/service/marca.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
    selector: 'app-list-products',
    templateUrl: './listProducts.component.html',
    styleUrls: ['./listProducts.component.scss']
  })

  export class ListProductsComponent implements OnInit {

  //   agregarPedido(p){
  //     let pedido={
  //     nombreImagen:p.nombreImagen,
  //     codigo_producto: p.id,
  //     cantidad:1,
  //     titulo:p.titulo,
  //     precio:p.precio,
  //   }
  //     this._servicioPedidos.agregarPedido(pedido);
  // }

    public products:ProductModelResponse[]=[];
    public recordCount: any=0;
    public categories:CategoryModel[];
    public marcas:MarcaModel []=[];

    //Filtros
    public filter:Filter;
    public order:OrderField;
    public orderAsc:boolean; 
    public orderSelect;
    public filterSelection:string="Nigun filtro seleccionado";
    public from:number;

    @ViewChild(NgForm) myForm: NgForm;  
    public show: any =true;
    //Modales
    public data = [];
    public selectedItem: any;
  
    constructor( 
      private productService:ProductService, 
      private categorieService:CatgeorieService, 
      private marcasService:MarcaService,
      public loadingService:LoadingService, 
      private router: Router, private auth:AuthService,
      private rutaActiva: ActivatedRoute
    ) {}
     
    ngOnInit(): void {
      this.filter=new Filter();
      this.traerCategorias();  
      this.getMarcas();
      this.rutaActiva.params.subscribe(
        (params: Params) => {
          this.filter.MarcaId=params.filterId;
          this.filter.CategoryId=params.categoryId;
          this.filter.Discount=params.discount;
        }
      );
      this.filter.CategoryId=this.rutaActiva.snapshot.params.filter == 'categoria'? this.rutaActiva.snapshot.params.value : null;
      this.filter.MarcaId=this.rutaActiva.snapshot.params.filter == 'marca'? this.rutaActiva.snapshot.params.value : null;
      this.filter.Discount=this.rutaActiva.snapshot.params.filter == 'descuento'? true : null;
      console.log(this.filter)
    }

    ngAfterViewInit() { 
      console.log(this.filter) 
      this.onChangesFilters();
    }
    
    // Filtros
    public onChangesFilters(): void {
          this.myForm.valueChanges.subscribe(() => {            
            this.listAllProducts();
          });
    }
 
    public listAllProducts(){      
      this.loadingService.setLoading(true);
      var itemsPerPage=null;
        this.productService.listAllProducts(this.filter, this.order, this.from, itemsPerPage, this.orderAsc).subscribe(
          res=>{
            this.products=[];
            this.products=res['Data'] as ProductModelResponse [];
            this.recordCount=res['RecordsCount'];
            this.loadingService.setLoading(false);
          },
          error=>{
            alert('ERROR DE SERVIDOR');
            this.loadingService.setLoading(false);
          }
        );
        if(this.products.length=0){
          alert("No se encuentra productos disponibles con esas caratceristicas")
        }
    }
  
    public edit(productId:number){   
      this.productService.productId=productId;
      return false;
    }

    public eliminar(p){
      this.productService.delete(p).subscribe(
        datos=>{
            alert("SE ELIMINO EXITOSAMENTE")
            this.listAllProducts(); 
        },
        error =>{
          alert('ERROR DE SERVIDOR');
        }
      );   
    }

    //lista categorias
     public traerCategorias(){
        this.categorieService.list().subscribe(
          res=>{
            this.categories=res;
          },
          error=>{
            alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
          }
        );

    }

    public getMarcas(){
        this.marcasService.getMarcas().subscribe(
          res=>{
            this.marcas=res;      
          },
          error=>{
            alert('HUBO UN PROBLEMA CON EL SERVIDOR');
          }
        );

    }

    public  isLogin():boolean{
      return this.auth.isLoggedIn()
    }

    public showFilters(){
      this.show=!this.show ? true : false;
    }

    public setOrder(e){
      if(e==1 || e==3){
        this.orderAsc=true
        this.order=e==1?OrderField.price : OrderField.title       
      }
      if(e==2 || e==4){
        this.orderAsc=false
        this.order=e==2?OrderField.price : OrderField.title  
      }
      this.listAllProducts()
    }

    public setCategory(c:number){
      this.filter.CategoryId=c;
      this.listAllProducts()

    }

    public setMarca(c:number){
      this.filter.MarcaId=c;
      this.listAllProducts()
    }

    public limpiarSelection(){
      this.filterSelection=null;
    }

    // ngOnDestroy(): void {
    //   this.subsChangeFilters.unsubscribe();
    // }

}
  
  