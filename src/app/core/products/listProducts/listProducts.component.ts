import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, Query} from '@angular/core';
import { Filter } from 'src/app/core/products/listProducts/models/Filter';
import { OrderField } from 'src/app/core/products/listProducts/models/OrderField';
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
import { OrderService } from 'src/app/orders/service/order.service';
import { Order } from 'src/app/orders/models/Order';
import { Subscription } from 'rxjs';



@Component({
    selector: 'app-list-products',
    templateUrl: './listProducts.component.html',
    styleUrls: ['./listProducts.component.scss']
  })

  export class ListProductsComponent implements OnInit {

    public products:ProductModelResponse[]=[];
    public recordCount: any=0;
    public categories:CategoryModel[];
    public marcas:MarcaModel []=[];

    //Filtros
    @ViewChild(NgForm) myForm: NgForm;  

    public filter:Filter;
    public orderField:OrderField;
    public orderAsc:boolean=false; 
    public orderSelect;
    public from:number;
    public show: any =true;
    public showChangePrice=false;
    //Modales
    public data = [];
    public selectedItem: any;


    //Modal Images
    public hiddeModal: boolean;
    public productIdToModel: number;
    public cabecera: string;
    public subscription:Subscription;
    

    constructor( 
      private productService:ProductService, 
      private categorieService:CatgeorieService, 
      private marcasService:MarcaService,
      private _serviceOrder:OrderService,
      public loadingService:LoadingService, 
      private router: Router, private auth:AuthService,
      private rutaActiva: ActivatedRoute
    ) {}
     
    ngOnInit(): void {
      this.filter=new Filter();
      this.getCategoryByMarca();  
      this.getMarkByCategory();
      this.getParams();
      window.scroll(0,0)
      this.subscription=this.productService.refresh$.subscribe(()=>{
        this.listAllProducts(this.filter);
      })  
    }

    ngAfterViewInit() { 
      //this.listAllProducts(this.filter);
      this.onChangesFilters();
    }
    
    public addToCar(p:ProductModelResponse){
      let pedido:Order={
        nameImage: p.ImageName,
        categoryName: p.CategoryName,
        marcaName: p.MarcaName,
        productId: p.ProductId,
        count: 1,
        name: p.Name,
        price: p.Price,
        priceWithDiscount: p.PriceWithDiscount,
        priceTotal: p.PriceWithDiscount,
        discount: p.DiscountAmount      
      }
      this._serviceOrder.agregarPedido(pedido);
    }

    public getParams(){
      if(this.rutaActiva.snapshot.params.filter == 'categoria'){
        this.filter.CategoryId=this.rutaActiva.snapshot.params.value;
        this.setHeaderCategory();
      }
      if(this.rutaActiva.snapshot.params.filter == 'descuento'){
        this.filter.Discount=this.rutaActiva.snapshot.params.filter == 'descuento'? true : null;
      }
      this.rutaActiva.params.subscribe(params => {
        // this.param = params['yourParam'];
        if(this.rutaActiva.snapshot.params.filter == 'marca'){
          this.filter.MarcaId=this.rutaActiva.snapshot.params.value;
          this.filter.MarcaId = this.filter.MarcaId ==-1 ? null : this.filter.MarcaId;
          this.setHeaderMark();
        }
      }); 
    }

    public onChangesFilters(): void {
      this.myForm.valueChanges.subscribe((x:Filter) => {  
        this.listAllProducts(x);
      });
    }
 
    public clear(){
      this.filter.Search=null;
    }

    public listAllProducts(x:Filter){     
      this.loadingService.setLoading(true);
      this.from=null; var itemsPerPage=null; //Falta implementar
        this.productService.listAllProducts(x, this.from, itemsPerPage, this.orderAsc , this.orderField ).subscribe(
          res=>{
            if(res['RecordsCount']!=0){
              this.products=[];
              this.products=res['Data'] as ProductModelResponse [];
              this.recordCount=res['RecordsCount'];
            }else{
              alert("PRODUCTO NO DISPONIBLE, INTENTE CAMBIANDO LOS FILTROS")
              //Case when list product is null then empty secondary filters.
              if(this.cabecera=="marca"){
                this.filter.CategoryId=null;
              }else{
                this.filter.MarcaId=null;
              }
            }          
            this.loadingService.setLoading(false);
          },
          error=>{
            alert('ERROR DE SERVIDOR');
            this.loadingService.setLoading(false);
          }
        );  
    }
  
    public show_ChangePrice(){
      this.showChangePrice=this.showChangePrice ? false : true;
    }
    public changePrice(pricePercent){
      var CategoryId:number=this.filter.CategoryId
      var MarkId:number=this.filter.MarcaId
      this.loadingService.setLoading(false);
      if(CategoryId==null || MarkId== null){
        alert("SELECCIONE CATGEORIA Y MARCA")
      }else{
        this.productService.changePrice(pricePercent, this.filter.CategoryId, this.filter.MarcaId ).subscribe(
          res=>{
              alert("ACCION EXITOSA")
              this.loadingService.setLoading(false);
          },
          error=>{
            alert('ERROR DE SERVIDOR');
            this.loadingService.setLoading(false);
          }
        );
      }
    }

    public edit(productId:number){   
      this.productService.productId=productId;
    }

    public eliminar(p){
      this.loadingService.setLoading(true);
      this.productService.delete(p).subscribe(
        datos=>{
            alert("ACCION EXITOSA")
            this.loadingService.setLoading(false);
        },
        error =>{
          alert('ERROR DE SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );   
    }

    public procesImages(productId:number):void{
      this.productIdToModel=productId
      this.hiddeModal=  this.hiddeModal ? false : true;
      window.scroll(0,0)
    } 

    public  isLogin():boolean{
      return this.auth.isLoggedIn()
    }

    public showFilters(){
      this.show=!this.show ? true : false;
    }

    public setOrder(e){
      if(e=="PrecioAsc" || e=="NameAsc"){
        this.orderAsc=true
        this.orderField = e == "PrecioAsc" ? OrderField.Price : OrderField.ProductName       
      }
      if(e == "priceDesc" || e == "NameDesc"){
        this.orderAsc= false
        this.orderField= e == "priceDesc" ? OrderField.Price : OrderField.ProductName  
      }
      this.listAllProducts(this.filter);
    }

    public setHeaderMark(){
      var CategoryId:number=this.filter.CategoryId
      var MarkId:number=this.filter.MarcaId

      //Set Header Filter with Mark, only if Catgeory is null
      if( MarkId!=null && CategoryId==null){
        this.cabecera="marca";
      }
      
      // If change the headerMark change categories.
      if(this.cabecera=="marca" ||  MarkId==null){
        if( MarkId==null){ //Put Off HeadreFilters
          this.cabecera="";
        }
        this.filter.CategoryId=null;
        this.getCategoryByMarca();
      }
      this.listAllProducts(this.filter);

    }

    public setHeaderCategory(){
      var CategoryId:number=this.filter.CategoryId
      var MarkId:number=this.filter.MarcaId

      //Set headerFilters with Category only if Mark is null
      if(CategoryId!=null && MarkId==null){
        this.cabecera="category";
      }
      
      // If change the headerCategory change marks.
      if(this.cabecera =="category" || CategoryId==null){
        if(this.filter.CategoryId==null){ //Put off headerFilters
          this.cabecera="";
        }
        this.filter.MarcaId=null;
        this.getMarkByCategory();
      }
      this.listAllProducts(this.filter);

    }

    public getCategoryByMarca(){
      this.loadingService.setLoading(true);
      this.categorieService.getCategoryByMarca(this.filter.MarcaId).subscribe(
        res=>{
          this.categories=[];
          this.categories=res as CategoryModel[];        
          this.loadingService.setLoading(false);
        },
        error=>{
          alert('ERROR DE SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );
    }

    public getMarkByCategory(){
      this.marcasService.getMarcaByCategory(this.filter.CategoryId).subscribe(
        res=>{
          this.marcas=[];
          this.marcas=res as MarcaModel[];        
          this.loadingService.setLoading(false);
        },
        error=>{
          alert('ERROR DE SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

}
  
  