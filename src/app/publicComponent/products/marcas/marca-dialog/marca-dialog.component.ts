import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/publicComponent/products/marcas/service/marca.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MarcaModel } from 'src/app/publicComponent/products/marcas/models/marcaModel';
import { DiscountModel } from 'src/app/publicComponent/products/discounts/models/discountModel';


@Component({
    selector: 'app-marca-dialog',
    templateUrl: './marca-dialog.component.html',
    styleUrls: ['./marca-dialog.component.scss']
  })

  export class MarcaDialogComponent
  {

  public uploadForm: any;
  private editing: boolean;

  @Input() data: MarcaModel;
  @Output() closeModal = new EventEmitter();
  

    constructor( 
      public loadingService:LoadingService, 
      private marcaService:MarcaService,
      private formBuilder:FormBuilder, @Inject(DOCUMENT) private document: Document
    ){
  
    }
     
  ngOnInit(): void {
    this.uploadForm=this.formBuilder.group({
        MarcaId:[null],
        Name:[null,[Validators.required]],    
    });
    this.editing=this.data!=null ? true: false
    this.editarPubliId(this.data)
  }

  get f(){ return this.uploadForm.controls;}

  onCloseModal(): void {
    this.closeModal.emit();
  }

  
  editarPubliId(e: MarcaModel){
      this.uploadForm.controls.MarcaId.setValue(e.MarcaId );
      this.uploadForm.controls.Name.setValue(e.Name );
      window.scrollTo(0,0);
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
    this.loadingService.setLoading(true);

    this.marcaService.update(this.uploadForm.value).subscribe(
      res=>{
        this.loadingService.setLoading(false);
        this.onCloseModal();
        alert('DATOS GUARDADOS');
      },
      error=>{
        this.loadingService.setLoading(false);
        alert('ERROR EN EL SERVIDOR');
      }
    );
  }

  insert(){
    this.marcaService.save(this.uploadForm.value).subscribe(
      res=>{
        this.loadingService.setLoading(false);
        this.onCloseModal();
        alert('DATOS GUARDADOS');
      },
      error=>{
        this.loadingService.setLoading(false);
        alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
      }
    );
  }

  // delete(categoryId:number){
  //   this.loadingService.setLoading(true);

  //   this.marcaService.delete(categoryId).subscribe(
  //     res=>{
  //       this.loadingService.setLoading(false);
  //       alert('SE ELIMINO CON EXITO');
  //       this.onCloseModal();
  //     },
  //     error=>{
  //       this.loadingService.setLoading(false);
  //       alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
  //     }
  //   );
  // }

    
}
  
  