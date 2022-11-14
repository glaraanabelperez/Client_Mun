import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input, ChangeDetectorRef} from '@angular/core';
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


  public state: any[]=[{ valor:false, name:'Suspendido'}, { valor:true, name:'Activo'}];
  public uploadForm: any;

  public product:ProductModel=null;
  public marcas:MarcaModel[];
  public categories: CategoryModel[];
  public discounts: DiscountModel[]=[];
  public images: ProductImageModel []=[];
  
  private accionBtnFormulario: string;

  public hiddeModal: boolean;
  public oldImageIndex: number;


  constructor( 
      private productService:ProductService, 
      public serviceImage:ImageService,
      private categoireService:CatgeorieService,
      private marcaService:MarcaService,
      private discountService:DiscountService,
      private loadingService:LoadingService,  
      private formBuilder:FormBuilder, @Inject(DOCUMENT) private document: Document,
      private cdRef:ChangeDetectorRef
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
      this.getProduct(this.productService.productId);     
      this.getImages(this.productService.productId);
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
      this.procesImages(null);
      this.oldImageIndex=i;
    }

    procesImages(newImage?:ImageTranser):void{
      if(newImage!=null && newImage.arrayBuffer!=null){
        this.addNewImage_List(newImage);
        if(this.oldImageIndex!=null){
          this.putOffOldImage_List(this.images[this.oldImageIndex]);
        }
      }
      this.hiddeModal=this.hiddeModal ? false : true;
      window.scroll(0,0);
    } 

    addNewImage_List(newImage:ImageTranser){
      this.serviceImage.imagesInsertList.push(newImage);
    }

    putOffOldImage_List(oldImage :ProductImageModel){
      this.serviceImage.imagesDeleteList.push(oldImage);
        this.images.splice(this.oldImageIndex, 1);
        this.oldImageIndex = null;
    }

    putOffNewImage_List(deleteNewImage:number){
     this.serviceImage.imagesInsertList.splice(deleteNewImage,1);
    }

    deleteImagesServer(image){
        this.serviceImage.delete(image)
        .subscribe(
          res=>{
            console.log(res)
          }, error =>{
              console.log(error)
          }
        )
    }

    insertImage(list:ImageTranser [], productId:number){
      const formData = new FormData();
      formData.append('file', list[0].file);
      formData.append('file2', list[0].file[0], list[0].file[0].name); 
        this.serviceImage.insert(formData, productId)
        .subscribe(
          res=>{
            console.log(res)
          }, error =>{
              console.log(error)
          }
        )
    }

    

    submitted=false;
    onSubmit(){
      // this.submitted=true;
      // if(this.uploadForm.invalid){
      //   return;
      // }else{
      //   this.loadingService.setLoading(true);
      //   if(this.accionBtnFormulario=="editar"){
      //       this.productService.update(this.uploadForm.value)
      //       .subscribe(
      //         res => {
      //           this.loadingService.setLoading(false)
      //           console.log(res)
      //           alert('Publicacion Editada');
      //         },
      //         error => {
      //           console.log(error)
      //         }
      //       );
            
      //   }
        if(this.accionBtnFormulario=="nuevo"){
          this.insertImage(this.serviceImage.imagesInsertList, 2);
          // alert('Publicacion Cargada');
          // this.productService.insert(this.uploadForm.value)
          //   .subscribe(
          //     res => {
          //       this.loadingService.setLoading(false)
          //       console.log(res)
          //       //llamada encadenada
          //       this.insertImage(this.serviceImage.imagesInsertList, 2);
          //       alert('Publicacion Editada');
          //     },
          //     error => {
          //       console.log(error)
          //     }
          //   );
         }
      // }
      // this.accionBtnFormulario="nuevo";
      // this.limpiar();
    }
  
    limpiar(){
      this.uploadForm.reset();
      this.serviceImage.imagesDeleteList=[];
      this.serviceImage.imagesInsertList=[];
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
  
  