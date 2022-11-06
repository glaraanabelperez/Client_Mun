import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, Query} from '@angular/core';
import { Filter } from 'src/app/publicComponent/products/models/Filter';
import { OrderField } from 'src/app/publicComponent/products/models/OrderField';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-services/auth.service';
import { ProductModelDto } from 'src/app/publicComponent/products/models/productModelDto';
import { CategoryModel } from '../categories/models/categoryModel';
import { LoadingService } from 'src/app/services/loading.service';
import { CatgeorieService } from '../categories/service/categorie.service';
import { ProductService } from '../service/product.service';


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
    public user;

    public products:ProductModelDto[]=[];
    public categories:CategoryModel[];
    // public imgDefecto:string;

    //Filtros
    public subsChangeFilters: Subscription;
    public filter:Filter = new Filter();//myform
    public order:OrderField;//myform
    public orderAsc:boolean; //myform
    public orderSelect;
    public filterSelection:string="Nigun filtro seleccionado";

    public from:number;
    public itemsPerPage:number;

    public lengthMaxPages=4;
    public pages:Array<number>=[1,2,3,4];
    public recordCount: any=0;
    public currentPage;
    public totalPage: number;

    @ViewChild(NgForm) myForm: NgForm; 
  
    public show: any =true;

    //Modales
    public data = [];
    public selectedItem: any;
  
    

    constructor( 
      private productService:ProductService, 
      private categorieService:CatgeorieService, 
      public loadingService:LoadingService, 
      private router: Router, private auth:AuthService
    ) {
    this.user=localStorage.getItem('username')   
    // this.emitProduct=new EventEmitter();
    // this.orderKeys=Object.keys(OrderField);
    }
     
    ngOnInit(): void {

      this.itemsPerPage=1;
      this.currentPage=1;
      this.traerCategorias();  
    }

    ngAfterViewInit() {
      // this.subsChangeFilters = this.productService.changeFilters$.subscribe(() => this.listAllProducts())
      this.onChangesFilters();
    }
    
    // Filtros
    public onChangesFilters(): void {
          this.myForm.valueChanges.subscribe(() => {            
            this.pagination(1);

          });
    }

 
    public listAllProducts(){      
      this.loadingService.setLoading(true);
      this.itemsPerPage=1;
        this.productService.listAllProducts(this.filter, this.order, this.from, this.itemsPerPage, this.orderAsc).subscribe(
          res=>{
            this.products=[];
            this.products=res['Data'] as ProductModelDto [];
            this.recordCount=res['RecordsCount'];
            this.setTotalPages();
            this.loadingService.setLoading(false);
          },
          error=>{
            alert('NO SE ECNUENTRAN RESULTADOS');
            this.loadingService.setLoading(false);
          }
        );
        
    }
  
    public edit(productId:number){   
      this.productService.productId=productId;
      console.log(this.productService.productId)
      return false;
    }

    public eliminar(p){
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
     public traerCategorias(){
      if(localStorage.getItem('codigo_usar')==undefined || localStorage.getItem('codigo_usar')==null){
        alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
        this.router.navigateByUrl('login')
      }
        this.categorieService.listCategories().subscribe(
          res=>{
            this.categories=res;
            
            alert('BIENVENIDO');
          },
          error=>{
            alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
          }
        );

    }

  //Paginacion y logica de controles
    public pagination(page:number): void {//trae los registros segun pagina
      if(this.currentPage>0 || this.currentPage<=this.recordCount){
          this.currentPage=page;
          this.from=(page*this.itemsPerPage)-this.itemsPerPage; 
          this.listAllProducts();  
          this.changePagination();
      }
    }

    public changePagination(): void{ 
      var x;
     
        switch (this.currentPage) {
          case (this.currentPage>this.pages[this.pages.length-1] && this.currentPage!=this.recordCount) || this.currentPage==1 :
            x=this.currentPage;
            this.pages=[];
                while(this.pages.length<=this.lengthMaxPages && this.currentPage<this.recordCount){
                this.pages.push(x)  
                x+=1;
                }
            break;
  
          case this.currentPage<this.pages[0] && this.currentPage>=1 && this.currentPage<this.recordCount
                || this.currentPage==this.recordCount && this.currentPage<this.recordCount:
            x=this.currentPage;
          this.pages=[];
              while(this.pages.length<=this.lengthMaxPages){
               this.pages.unshift(x)  
               x-=1;
              }
            break;
        
        }
          
    }


    public setTotalPages(){
      this.totalPage=this.recordCount/this.itemsPerPage; 
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
      this.pagination(1)
    }

    public setCategory(c:number){
      this.filter.CategoryId=c;
      this.pagination(1)
    }
    
    public limpiarSelection(){
      this.filterSelection=null;
    }

    // ngOnDestroy(): void {
    //   this.subsChangeFilters.unsubscribe();
    // }

}
  
  