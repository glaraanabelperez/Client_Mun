import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DiscountModel } from 'src/app/core/models/discountModel';
import { DiscountService } from 'src/app/core/services/discount.service';


@Component({
    selector: 'app-discount-dialog',
    templateUrl: './discount-dialog.component.html',
    styleUrls: ['./discount-dialog.component.scss']
  })

  export class DiscountDialogComponent
  {

  public uploadForm: any;
  private editing: boolean;

  @Input() data: DiscountModel;
  @Output() closeModal = new EventEmitter();
  

    constructor( 
      public loadingService:LoadingService, 
      private discountService:DiscountService,
      private formBuilder:FormBuilder, @Inject(DOCUMENT) private document: Document
    ){
  
    }
     
  ngOnInit(): void {
    this.uploadForm=this.formBuilder.group({
        DiscountId:[null],
        Name:[null,[Validators.required]],    
    });
    this.editing=this.data!=null ? true: false
    this.editarPubliId(this.data)
  }

  get f(){ return this.uploadForm.controls;}

  onCloseModal(): void {
    this.closeModal.emit();
  }

  
  editarPubliId(e: DiscountModel){
      this.uploadForm.controls.CategoryId.setValue(e.DiscountId );
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
        this.uploadCatgeory();
      }
      if(!this.editing){
        this.insertCategory();
      }
    }
    this.editing=false;
  }

  uploadCatgeory(){
    this.discountService.update(this.uploadForm.value).subscribe(
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

  insertCategory(){
    this.discountService.save(this.uploadForm.value).subscribe(
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
  
  