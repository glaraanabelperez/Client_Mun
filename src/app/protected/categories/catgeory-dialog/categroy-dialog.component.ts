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
  public category: CategoryModel; 
  private accionBtnFormulario: string;

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

  if(this.category!=null){
      this.accionBtnFormulario="editar"
  }else{
      this.accionBtnFormulario="nuevo";
  }
    
  }
  get f(){ return this.uploadForm.controls;}

  onCloseModal(): void {
    this.closeModal.emit();
  }
  
  editarPubliId(e: CategoryModel){
      this.uploadForm.controls.categoryId.setValue(e.CategoryId );
      this.uploadForm.controls.Name.setValue(e.Name );
      window.scrollTo(0,0);
  }

  submitted=false;
  onSubmit(){
    this.submitted=true;
    if(this.uploadForm.invalid){
      return;
    }else{
      if(this.accionBtnFormulario=="editar"){
        this.uploadCatgeory();
      }
      if(this.accionBtnFormulario=="nuevo"){
        this.insertCategory();
      }
    }
    this.accionBtnFormulario="nuevo";
  }

  uploadCatgeory(){
    this.categoireService.uploadCategory(this.uploadForm.value).subscribe(
      res=>{
       console.log(res)
        this.loadingService.setLoading(false);
        alert('BIENVENIDO');
      },
      error=>{
        this.loadingService.setLoading(false);
        alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
      }
    );
  }

  insertCategory(){
    this.categoireService.insertCategory(this.uploadForm.value).subscribe(
      res=>{
       console.log(res)
        this.loadingService.setLoading(false);
        alert('BIENVENIDO');
      },
      error=>{
        this.loadingService.setLoading(false);
        alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
      }
    );
  }

    
}
  
  