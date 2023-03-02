import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { DiscountModel } from 'src/app/core/products/discounts/models/discountModel';
import { DiscountService } from 'src/app/core/products/discounts/service/discount.service';


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
        Amount:[null, 
          [ Validators.min(1), Validators.max(100), Validators.required,
            Validators.pattern(/^\d+$/)]
        ], 
        CretaedBy:[null]   
    });

    this.editing=this.data!=null ? true: false
    this.editarPubliId(this.data)
  }

  get f(){ return this.uploadForm.controls;}

  onCloseModal(): void {
    this.closeModal.emit();
  }

  
  editarPubliId(e: DiscountModel){
      this.uploadForm.controls.DiscountId.setValue(e.DiscountId?e.DiscountId : null );
      this.uploadForm.controls.Amount.setValue(e.Amount );
      window.scrollTo(0,0);
  }

  submitted=false;
  onSubmit(){
    this.submitted=true;
    if(this.uploadForm.invalid){
      return;
    }else{
        this.postDiscount();
    }
  }

  postDiscount(){
    this.discountService.postDiscount(this.uploadForm.value).subscribe(
      res=>{
        this.loadingService.setLoading(false);
        alert('ACCION EXITOSA');
        this.onCloseModal();
      },
      error=>{
        this.loadingService.setLoading(false);
        alert('ERROR EN EL SERVIDOR, PUEDE QUE EL DESCUENTO ESTE DUPLICADO');
        this.onCloseModal();
      }
    );
  }

}
  
  