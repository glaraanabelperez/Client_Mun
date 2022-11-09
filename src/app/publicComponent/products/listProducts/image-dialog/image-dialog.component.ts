import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ProductImageModel } from '../models/productImageModel';
import { FormBuilder, Validators } from '@angular/forms';
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

  @Output() sendImage = new EventEmitter<ImageTranser>();

  public uploadForm: any;
  private editing: boolean;

  public imageTranser: ImageTranser;
  public message: string;
  public editImage: string;

  constructor( public formBuilder:FormBuilder, public loadingService:LoadingService,public imageService:ImageService){
    this.imageTranser=new ImageTranser();
  }
     
ngOnInit(): void {
  this.uploadForm=this.formBuilder.group({
    ProductImageId:[null], 
    Name:[null],    
  });

  // if(this.data!=null){
  //   this.editarPubliId(this.data)
  // }

}
onCloseModal(): void {
  this.sendImage.emit(this.imageTranser);
}

// editarPubliId(e: ProductImageModel){
//   this.uploadForm.controls.ProductImageId.setValue(e.ProductImageId );
//   this.uploadForm.controls.Name.setValue(e.Name );
//   window.scrollTo(0,0);
// }

guardarImagenEnFormGroup(files){
      let imagen = files[0];
      this.uploadForm.controls['Name'].setValue(imagen ? imagen.name : ''); // 
}

previsualizarImg(files){
  var img = files[0].type;
  if (files.length === 0){
    return;
  }else if (img.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return; 
  }else{
    this.verifyFileOnServer(files);
  }
}


verifyFileOnServer(files) {
  this.imageService.verifyFileOnServer(files[0].name) 
    .subscribe(
      response => {
            this.guardarImagenEnFormGroup(files);
            var fileReade=new FileReader();
            fileReade.readAsDataURL(files[0]); 
            // this.imageTranser.fileReade=fileReader
            fileReade.onload = (_event) => { 
              this.imageTranser.arrayBuffer = fileReade.result;  
            }
            this.imageTranser.file =files;
      },
      error => {
        alert("Error en el servidor")
        return;
      });
  return;
}

 
submitted=false;
onSubmit(){
  this.submitted=true;
  if(this.uploadForm.invalid){
    return;
  }else{
    if(this.editing){
      this.upload();
    }
    if(!this.editing){
      this.insert();
    }
  }
  this.editing=false;
}

upload(){
  this.imageService.upload(this.uploadForm.value).subscribe(
    res=>{
      this.loadingService.setLoading(false);
      alert('SE EDITO CON EXITO ');
      this.onCloseModal();
    },
    error=>{
      this.loadingService.setLoading(false);
      alert('ERROR EN EL SERVIDOR');
    }
  );
}

insert(){
  this.imageService.insert(this.uploadForm.value).subscribe(
    res=>{
      this.loadingService.setLoading(false);
      alert('SE GUARDO CON EXITO');
      this.onCloseModal();
    },
    error=>{
      this.loadingService.setLoading(false);
      alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
    }
  );
}


    
}
  
  