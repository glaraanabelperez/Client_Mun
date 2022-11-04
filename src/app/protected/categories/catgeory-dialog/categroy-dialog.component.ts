import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CategoryModel } from 'src/app/core/models/categoryModel';
import { FormBuilder, Validators } from '@angular/forms';
import { CatgeorieService } from 'src/app/core/services/categorie.service';
import { MarcaService } from 'src/app/core/services/marca.service';
import { LoadingService } from 'src/app/core/services/loading.service';


@Component({
    selector: 'app-category-dialog',
    templateUrl: './category-dialog.component.html',
    styleUrls: ['./category-dialog.component.scss']
  })

  export class CategoryDialogComponent
  {

  public uploadForm: any;
  private editing: boolean;

  @Input() data: CategoryModel;
  @Output() closeModal = new EventEmitter();
  

    constructor( 
      public loadingService:LoadingService, 
      private categoireService:CatgeorieService,private marcaService:MarcaService,
      private formBuilder:FormBuilder, @Inject(DOCUMENT) private document: Document
    ){
  
    }
     
  ngOnInit(): void {
    this.uploadForm=this.formBuilder.group({
        CategoryId:[null],
        Name:[null,[Validators.required]],    
    });
    this.editing=this.data!=null ? true: false
    this.editarPubliId(this.data)
  }

  get f(){ return this.uploadForm.controls;}

  onCloseModal(): void {
    this.closeModal.emit();
  }

  
  editarPubliId(e: CategoryModel){
      this.uploadForm.controls.CategoryId.setValue(e.CategoryId );
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
    this.categoireService.uploadCategory(this.uploadForm.value).subscribe(
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
    this.categoireService.insertCategory(this.uploadForm.value).subscribe(
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
  
  