import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProductImageModel } from '../models/productImageModel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ImageService } from '../service/imageService';
import { LoadingService } from 'src/app/services/loading.service';
import { ImageTranser } from '../models/imagesTransferModel';

@Component({
    selector: 'app-image-dialog',
    templateUrl: './image-dialog.component.html',
    styleUrls: ['./image-dialog.component.scss']
  })

  export class ImageDialogComponent implements OnInit
  {

  @Output() close = new EventEmitter<any>();
  @Input() productIdToModel:number;

  @ViewChild('file') file: ElementRef;

  public uploadForm: any;

  public imageTranser: ImageTranser;
  public message: string;
  public editImage: string;
  public Name:any;

  public images: ProductImageModel []=[];
  public listImagesToInsert: any [] = [];
  public listImagesToDelete: ProductImageModel [] = [];

  constructor( public formBuilder:FormBuilder, 
    public loadingService:LoadingService,
    public serviceImage:ImageService
    ){
    
  }
     
ngOnInit(): void {
}

ngAfterViewInit(){
  this.imageTranser=new ImageTranser();
  this.getImages(this.productIdToModel)
}

clean(){
  this.file.nativeElement.value = '';
  // this.imageTranser.arrayBuffer=null;
}

onCloseModal(): void {
  this.close.emit();
}

confirm(){
  if(this.listImagesToInsert.length>0){
    this.saveInserver();
  }
  if(this.listImagesToDelete.length>0){
    this.deleteInserver();
  }
}

saveInserver(){
      const formData = new FormData();
      this.listImagesToInsert.forEach(element => {
        formData.append('file', element.file[0], element.file[0].name); 
      });
      this.serviceImage.insert(formData, this.productIdToModel).subscribe(
        res=>{
          this.loadingService.setLoading(false);
          alert('SE GUARDO CON EXITO');
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR AL GUARDAR IMAGEN');
        }
      );
}

saveImage(files){
  var img = files[0].type;
  if (files.length === 0){
    return;
  }else if (img.match(/image\/*/) == null) {
    alert("Only images are supported.");
    return; 
  }else{
    this.verifyFileOnServer(files, this.productIdToModel);
  }
}

getImages(productId:number){
  this.loadingService.setLoading(true);
  this.serviceImage.get(productId).subscribe(
    res=>{
      this.loadingService.setLoading(false);
      this.images=res;
    },
    error=>{
      this.loadingService.setLoading(false);
      alert('HUBO UN PROBLEMA CON EL SERVIDOR');
    }
  );
}

deleteImageNew(index:number){
this.listImagesToInsert.splice(index, 1);
}

deleteImagesOld(image: ProductImageModel, index:number){
  this.listImagesToDelete.push(image)
  this.images.splice(index, 1)
}

deleteInserver(){
  this.serviceImage.delete(this.listImagesToDelete)
  .subscribe(
    res=>{
      alert("Datos borados");
    }, 
    error =>{
        alert("Error al borrar imagen")
    });
}

verifyFileOnServer(files, productIdToModel) {
  this.loadingService.setLoading(true)
  this.serviceImage.verifyFileOnServer(files[0].name, productIdToModel) 
    .subscribe(
      response => {
        this.loadingService.setLoading(false)
         var fileReade=new FileReader();
          fileReade.readAsDataURL(files[0]); 
          fileReade.onload = (_event) => { 
            var im=new ImageTranser();
            im.arrayBuffer = fileReade.result;  
            im.file =files; 
            this.listImagesToInsert.push(im)
            }
            // this.saveInserver(files);
      },
      error => {
        this.loadingService.setLoading(false)
        alert("La imagen ya existe")
        return;
      });
  return;
}

}
  
  