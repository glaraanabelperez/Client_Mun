import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { FormBuilder, Validators } from '@angular/forms';

import { ProductModel } from 'src/app/publicComponent/products/listProducts/models/productModel';
import { ProductImageModel } from 'src/app/publicComponent/products/listProducts/models/productImageModel';
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



@Component({
    selector: 'app-productDialog',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
  })

  export class ProductDialogComponent implements OnInit {

  // @Input() editProduct :Productos;

  public state: any[]=[{ valor:false, name:'Suspendido'}, { valor:true, name:'Activo'}];
  public uploadForm: any;

  public product:ProductModel=null;
  public marcas:MarcaModel[];
  public categories: CategoryModel[];
  public discounts: DiscountModel[]=[];
  public images: ProductImageModel []=[];
 
  private userId: string;
  private today: string;
  
  private accionBtnFormulario: string;

  public imagesToPreview: any []=[];
  showModal: boolean;
  imagesIndex: number;




  

  constructor( 
      private productService:ProductService, 
      public serviceImage:ImageService,
      private categoireService:CatgeorieService,
      private marcaService:MarcaService,
      private discountService:DiscountService,
      private loadingService:LoadingService,  
      private formBuilder:FormBuilder, @Inject(DOCUMENT) private document: Document
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
      state:['',[Validators.required]],
      price:[null],
      featured:[''],
    });

    if(this.productService.productId!=null){
      this.accionBtnFormulario="editar"
      this.getProducts(this.productService.productId);     
      this.getImages(this.productService.productId);
    }else{
      this.accionBtnFormulario="nuevo";
    }
    
    this.userId=localStorage.getItem('codigo_usar'); 
    this.getFecha();

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
      this.marcaService.getAllMarcas().subscribe(
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

    getProducts(productId :number){
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

    getImages(productId:number){
      this.serviceImage.get(productId).subscribe(
        res=>{
          this.images=res;
        },
        error=>{
          alert('HUBO UN PROBLEMA CON EL SERVIDOR');
        }
      );
    
    }

    editImage(i:number){
      this.showingModalImage(null);
      this.imagesIndex=i;
    }

    showingModalImage(sendImage:ImageTranser):void{
      if(sendImage!=null){
        this.serviceImage.imagesInsertList.push(sendImage);
        if(this.imagesIndex!=null){
          this.serviceImage.imagesDeleteList.push(this.images[this.imagesIndex]);
          this.images.splice(this.imagesIndex, 1);
          this.imagesIndex = null;
        }
      }
      
      this.showModal=this.showModal ? false : true;
      window.scroll(0,0);
    } 

    deleteSelectionImage(i:number){
      this.serviceImage.imagesInsertList.splice(i,1);
    }

    getFecha(){
      var d = new Date();
      this.today = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    }

    submitted=false;
    onSubmit(){
      this.submitted=true;
      if(this.uploadForm.invalid){
        return;
      }else{
        if(this.accionBtnFormulario=="editar"){
            // this._service_protected.procesar(this.img_editar,this.imagenNueva_guardar, this.uploadForm.value );
            // this._service_protected.editarDatos(this.uploadForm.value);
            alert('Publicacion Editada');
        }
        if(this.accionBtnFormulario=="nuevo"){
            // this._service_protected.guardarArchivoServidor(this.imagenNueva_guardar);
          // this._service_protected.insertarDatos(this.uploadForm.value);
          alert('Publicacion Cargada');
        }
      }
      this.accionBtnFormulario="nuevo";
      this.limpiar();
    }
  
    limpiar(){
      this.document.location.reload(); 
      this.uploadForm.reset();
      this.serviceImage.imagesDeleteList=[];
      this.serviceImage.imagesInsertList=[];
    }
  
    editarPubliId(e: ProductModel){
      this.uploadForm.controls.productId.setValue(e.ProductId );
      this.uploadForm.controls.categoryId.setValue(e.CategoryId );
      this.uploadForm.controls.marcaId.setValue(e.MarcaId );
      this.uploadForm.controls.discountId.setValue(e.DiscountId );
      this.uploadForm.controls.name.setValue(e.Name );
      this.uploadForm.controls.description.setValue(e.Description );
      this.uploadForm.controls.price.setValue(e.Price );
      this.uploadForm.controls.featured.setValue(e.Featured );
      this.uploadForm.controls.state.setValue(e.State );

      window.scrollTo(0,0);
   }

   public rsta;
   public guardarArchivoServidor(files){
  let fileImg=new FormData();
  fileImg.append('file', files[0], files[0].name); 
  fileImg.append('carpeta', localStorage.getItem('username'))
  this.serviceImage.insertFileOnServer(fileImg)
  .subscribe(
    response => {
      this.rsta = response; 
      if(this.rsta <= 1){
        alert("ERROR AL GUARDAR LA IMAGEN") 
      }else{
        if(this.rsta.code == 200 && this.rsta.status == "success"){
          alert("LA IMEGEN SE SUBIO") 
        }else{
          alert("ERROR AL GUARDAR LA IMAGEN") 
        }
      }
    },
    error => {
      alert("ERROR AL GUARDAR LA IMAGEN") 
    });
}

    
}
  
  