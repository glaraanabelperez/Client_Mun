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

  @Output() sendImage = new EventEmitter<ImageTranser>();
  @ViewChild('file') file: ElementRef;

  public uploadForm: any;
  private editing: boolean;

  public imageTranser: ImageTranser;
  public message: string;
  public editImage: string;
  public Name:any;

  constructor( public formBuilder:FormBuilder, public loadingService:LoadingService,public imageService:ImageService){
    this.imageTranser=new ImageTranser();
  }
     
ngOnInit(): void {
}


clean(){
  this.file.nativeElement.value = '';
  this.imageTranser.arrayBuffer=null;
}

onCloseModal(): void {
  this.sendImage.emit(this.imageTranser.arrayBuffer!=null ? this.imageTranser : null);
}


guardarImagenEnFormGroup(files){
      let imagen = files[0];
      // this.uploadForm.controls['Name'].setValue(imagen ? imagen.name : ''); // 
      this.Name=imagen.name;
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
 
// submitted=false;
// onSubmit(){
//   this.submitted=true;
//   if(this.uploadForm.invalid){
//     return;
//   }else{
//     if(this.editing){
//       this.upload();
//     }
//     if(!this.editing){
//       this.insert();
//     }
//   }
//   this.editing=false;
// }

// upload(){
//   this.imageService.upload(this.uploadForm.value).subscribe(
//     res=>{
//       this.loadingService.setLoading(false);
//       alert('SE EDITO CON EXITO ');
//       this.onCloseModal();
//     },
//     error=>{
//       this.loadingService.setLoading(false);
//       alert('ERROR EN EL SERVIDOR');
//     }
//   );
// }

// insert(){
//   this.imageService.insert(this.uploadForm.value).subscribe(
//     res=>{
//       this.loadingService.setLoading(false);
//       alert('SE GUARDO CON EXITO');
//       this.onCloseModal();
//     },
//     error=>{
//       this.loadingService.setLoading(false);
//       alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
//     }
//   );
// }


    
}
  
  