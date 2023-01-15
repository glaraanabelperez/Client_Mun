import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, ChangeDetectorRef} from '@angular/core';
import { DOCUMENT, formatDate } from '@angular/common';
// import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { FormBuilder, Validators } from '@angular/forms';

import { ProductModel } from 'src/app/core/products/listProducts/models/productModel';
import { ProductImageModel } from 'src/app/core/products/listProducts/models/productImageModel';
import { CategoryModel } from '../../categories/models/categoryModel';
import { DiscountModel } from '../../discounts/models/discountModel';
import { MarcaModel } from '../../marcas/models/marcaModel';
import { DiscountService } from '../../discounts/service/discount.service';
import { CatgeorieService } from '../../categories/service/categorie.service';
import { ProductService } from '../service/product.service';
import { MarcaService } from '../../marcas/service/marca.service';
import { ImageService } from '../service/imageService';
import { LoadingService } from 'src/app/services/loading.service';
import { ImageTranser } from '../models/imagesTransferModel';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
    selector: 'app-productDialog',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
  })

  export class ProductDialogComponent implements OnInit {


  public stock: any[]=[{ valor:false, name:'No Disponible'}, { valor:true, name:'Disponible'}];
  public uploadForm: any;

  public product:ProductModel=null;
  public marcas:MarcaModel[];
  public categories: CategoryModel[];
  public discounts: DiscountModel[]=[];


  private accionBtnFormulario: string;




  constructor( 
      private productService:ProductService, 
      private categoireService:CatgeorieService,
      private marcaService:MarcaService,
      private discountService:DiscountService,
      private loadingService:LoadingService,  
      private formBuilder:FormBuilder, @Inject(DOCUMENT) private document: Document,
      private router: Router
    ){
  }
     
  ngOnInit(): void {

    
    this.getCategories(); 
    this.getMarcas(); 
    this.getActiveDiscounts(); 

    this.uploadForm=this.formBuilder.group({
      productId:[null],
      categoryId:[null,[Validators.required]],
      marcaId:[null,[Validators.required]],
      discountId:[null],
      name:['',[Validators.required]],
      description:[''],
      nameImage: [null],
      stock:['',[Validators.required]],
      price:[null],
      featured:[''],
    });

    if(this.productService.productId!=null){
      this.accionBtnFormulario="editar"
      this.getProduct(this.productService.productId);     
      this.productService.productId=null
      // this.getImages(prodId);
    }else{
      this.accionBtnFormulario="nuevo";
    }
    
  }

    get f(){ return this.uploadForm.controls;}

    //
    getCategories(){
      this.loadingService.setLoading(true);
      this.categoireService.list().subscribe(
        res=>{
          this.categories=res as [];
          this.loadingService.setLoading(false);
        },
        error=>{
          alert('HUBO UN PROBLEMA CON EL SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );
    
    }

    getMarcas(){
      this.loadingService.setLoading(true);
      this.marcaService.getMarcas().subscribe(
        res=>{
          this.marcas=res as [];
          this.loadingService.setLoading(false);
        },
        error=>{
          alert('HUBO UN PROBLEMA CON EL SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );
    
    }

    getActiveDiscounts(){
      this.loadingService.setLoading(true);
      this.discountService.getActiveDiscounts().subscribe(
        res=>{
          this.discounts=res as [];
          this.loadingService.setLoading(false);
        },
        error=>{
          alert('HUBO UN PROBLEMA CON EL SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );
    
    }

    getProduct(productId :number){
      this.loadingService.setLoading(true);
      
      this.productService.getProduct(productId).subscribe(
        res=>{
          this.product=res; 
          this.editarPubliId(res);
          this.loadingService.setLoading(false);
        },
        error=>{
          alert('HUBO UN PROBLEMA CON EL SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );
      this.loadingService.setLoading(false);
    }

    public limpiar(){
    }

    submitted=false;
    onSubmit(){
      this.submitted=true;
      if(this.uploadForm.invalid){
        return;
      }else{
        this.loadingService.setLoading(true);
         if(this.accionBtnFormulario=="nuevo"){
          this.productService.insert(this.uploadForm.value).subscribe(
            result => {
              this.loadingService.setLoading(false);
              alert('Datos guardados');
           },
           error=>{
            alert('Error en el servidor');
            this.loadingService.setLoading(false);
           });         
        }
        if(this.accionBtnFormulario=="editar"){
          this.productService.update(this.uploadForm.value).subscribe(
            result => {
              this.loadingService.setLoading(false);
              alert('Datos guardados');
           },
           error=>{
            alert('Error en el servidor');
            this.loadingService.setLoading(false);
           });         
        }
      }
      this.router.navigate(['./productos/lista-productos']);
    }
  
    editarPubliId(e: ProductModel){
      this.uploadForm.controls.productId.setValue(e.ProductId );
      this.uploadForm.controls.categoryId.setValue(e.CategoryId );
      this.uploadForm.controls.marcaId.setValue(e.MarcaId!=null ? e.MarcaId : null );
      this.uploadForm.controls.discountId.setValue(e.DiscountId !=null ? e.DiscountId : null);
      this.uploadForm.controls.name.setValue(e.Name );
      this.uploadForm.controls.description.setValue(e.Description );
      this.uploadForm.controls.price.setValue(e.Price );
      this.uploadForm.controls.featured.setValue(e.Featured );
      this.uploadForm.controls.stock.setValue(e.Stock );

      window.scrollTo(0,0);
    }


}
  
