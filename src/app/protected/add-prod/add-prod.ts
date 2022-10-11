import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { Productos } from 'src/app/core/models/productos';
import { DOCUMENT } from '@angular/common';
// import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { ProtectedService } from '../../core/services/protected.service';
import { ServiceGeneral } from 'src/app/core/services/service-general.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'add-prod',
    templateUrl: './add-prod.html',
    styleUrls: ['./add-prod.scss']
  })

  export class AddProduct implements OnInit {

  // @Input() editProduct :Productos;

  public state: String[]=['Activada', 'Desactivada'];
  public uploadForm: any;

  private product:Productos=null;
  public buisness;
 
  private userId: string;
  private today: string;
  
  private accionBtnFormulario: string;

  public newImage: any;
  public showNewImage: string | ArrayBuffer;
  public message: string;
  public editImage: string;

  categories: CategoryModel[];

    constructor( private _serviceProtected:ProtectedService, @Inject(DOCUMENT) private document: Document,
    private _servicioGeneral:ServiceGeneral, private formBuilder:FormBuilder,) {

      this.buisness=localStorage.getItem('username')
      console.log(this.buisness)
      this.accionBtnFormulario= this.product!=null ? "nuevo" : "editar";
   
     }
     
    ngOnInit(): void {
   
    this.userId=localStorage.getItem('codigo_usar'); 
    this.getFecha();

    this.uploadForm=this.formBuilder.group({
        productId:[null],
        categoryId:[null,[Validators.required]],
        title:['',[Validators.required]],
        subtitle:[''],
        description:[''],
        nameImage: [null],
        date:[this.today],
        price:[null],
        featured:[''],
        promotion:[''],
        userId:[this.userId],
      });
      this.traerCategorias();
      this.editarPubliId(this._serviceProtected.product);
    }

    get f(){ return this.uploadForm.controls;}

    //CATEGORIAS NAV PROTECTED
    traerCategorias(){
      this._serviceProtected.obtenerCategoria(parseInt(localStorage.getItem('codigo_usar'),10)).subscribe(
        res=>{
          this.categories=res as [];
          console.log(this.categories)
        },
        error=>{
          alert('HUBO UN PROBLEMA CON EL SERVIDOR');
        }
      );
    
    }

    getFecha(){
      var d = new Date();
      this.today = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    }

    guardarImagenEnFormGroup(files){
      this.newImage=files;
      let imagen = files[0];
      this.uploadForm.controls['nombreImagen'].setValue(imagen ? imagen.name : ''); // <-- Set Value for Validation
    }
    
    respuesta;
    verificarImgServidor(files) {
      let fileImg=new FormData();
      fileImg.append('file', files[0], files[0].name); 
      this._servicioGeneral.existeImgServidor(fileImg) 
        .subscribe(
          response => {
            this.respuesta = response; 
            if(this.respuesta <= 1){
                alert("Error servidor")
                return;
            }else{
              if(this.respuesta.status == "success"){
                    this.guardarImagenEnFormGroup(files);
                    var reader = new FileReader();
                    reader.readAsDataURL(files[0]); 
                    reader.onload = (_event) => { this.showNewImage = reader.result;
                    }
              }else if(this.respuesta.status == "error"){
                alert("Ya existe la imagen")
                return;
              }
            }
          },
          error => {
            alert("Error sistema imagen")
            return;
          });
      return;
    }
  
    previsualizarImg(files){
      var img = files[0].type;
      if (files.length === 0){
        return;
      }else if (img.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return; 
      }else{
        this.verificarImgServidor(files);
      }
    }

    submitted=false;
    onSubmit(){
      this.submitted=true;
      if(this.uploadForm.invalid){
        return;
      }else{
        if(this.accionBtnFormulario=="editar"){
          if(this.showNewImage!=null){
            // this._service_protected.procesar(this.img_editar,this.imagenNueva_guardar, this.uploadForm.value );
          }
          if(this.showNewImage==null){
            // this._service_protected.editarDatos(this.uploadForm.value);
            alert('Publicacion Editada');
          }  
        }
        if(this.accionBtnFormulario=="nuevo"){
          if(this.showNewImage!=null){
            // this._service_protected.guardarArchivoServidor(this.imagenNueva_guardar);
          }
          // this._service_protected.insertarDatos(this.uploadForm.value);
          alert('Publicacion Cargada');
        }
      }
      this.accionBtnFormulario="nuevo";
      this.limpiar();
    }
  
    limpiar(){
      this.document.location.reload(); 
      // this.router.navigate(['/protected']);
    }
  
    editarPubliId(e: Productos){
      this.uploadForm.controls.productId.setValue(e.ProductId );
      this.uploadForm.controls.categoryId.setValue(e.CategoryId );
      this.uploadForm.controls.title.setValue(e.Title );
      this.uploadForm.controls.subtitle.setValue(e.Subtitle );
      this.uploadForm.controls.description.setValue(e.Description );
      this.uploadForm.controls.nameImage.setValue(e.NameImage );
      this.uploadForm.controls.price.setValue(e.Price );
      this.uploadForm.controls.featured.setValue(e.Featured );
      this.uploadForm.controls.promotion.setValue(e.Promotion );
      this.uploadForm.controls.userId.setValue(e.UserId );
      // this.uploadForm.controls['productId'].setValue(e.ProductId ? e.ProductId: ''); // <-- Set Value for Validation

      window.scrollTo(0,0);
      if(e.NameImage!=null){
        this.editImage=e['nombreImagen']
      }
   }

    
}
  
  