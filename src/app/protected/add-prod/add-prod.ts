import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { Productos } from 'src/app/core/models/productos';
import { DOCUMENT } from '@angular/common';
// import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { ProtectedService } from '../protected.service';
import { ServiceGeneral } from 'src/app/core/servicios-generales/service-general.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'add-prod',
    templateUrl: './add-prod.html',
    styleUrls: ['./add-prod.scss']
  })

  export class AddProduct implements OnInit {

  @Input() editProduct :Productos;

  userName;
  estado: any;
  codigo_usuario: string;
  today: string;
  uploadForm: any;
  accionBtnFormulario: string;
  mostrar_form: boolean;
  imagenNueva_guardar: any;
  imgNueva_mostrar: string | ArrayBuffer;
  message: string;
  img_editar: string;

    constructor( private _serviceProtected:ProtectedService, @Inject(DOCUMENT) private document: Document,
    private _servicioGeneral:ServiceGeneral, private formBuilder:FormBuilder,) {
        this.userName=localStorage.getItem('username')
     }
     
    ngOnInit(): void {
   
    this.estado= this._servicioGeneral.obtener_estado();
    this.codigo_usuario=localStorage.getItem('codigo_usar'); 
    this.getFecha();
    this.accionBtnFormulario="nuevo";
    this.mostrar_form=false;

    this.uploadForm=this.formBuilder.group({
        codigo_producto:[null],
        categorias:['',[Validators.required]],
        estado:['',[Validators.required]],
        titulo:['',[Validators.required]],
        subtitulo:[''],
        descripcion:[''],
        nombreImagen: [null],
        fechaAlta:[this.today],
        precio:[null],
        destacada:[''],
        promocion:[''],
        codigo_usuario:[this.codigo_usuario],
      });

    }

    get f(){ return this.uploadForm.controls;}


    getFecha(){
      var d = new Date();
      this.today = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
    }

    guardarImagenEnFormGroup(files){
      this.imagenNueva_guardar=files;
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
                    reader.onload = (_event) => { this.imgNueva_mostrar = reader.result;
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
          if(this.imgNueva_mostrar!=null){
            // this._service_protected.procesar(this.img_editar,this.imagenNueva_guardar, this.uploadForm.value );
          }
          if(this.imgNueva_mostrar==null){
            // this._service_protected.editarDatos(this.uploadForm.value);
            alert('Publicacion Editada');
          }  
        }
        if(this.accionBtnFormulario=="nuevo"){
          if(this.imgNueva_mostrar!=null){
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
    //   this.uploadForm.controls['codigo_producto'].setValue(e.id ? e.id: ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['categorias'].setValue(e.id_categoria ? e.id_categoria: ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['estado'].setValue(e.estado ? e.estado : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['titulo'].setValue(e.titulo ? e.titulo : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['subtitulo'].setValue(e.subtitulo ? e.subtitulo : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['descripcion'].setValue(e.descripcion ? e.descripcion : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['nombreImagen'].setValue(e.nombreImagen ? e.nombreImagen : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['fechaAlta'].setValue(e.fechaAlta ? e.fechaAlta : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['precio'].setValue(e.precio ? e.precio : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['destacada'].setValue(e.destacada ? e.destacada : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['promocion'].setValue(e.promocion ? e.promocion : ''); // <-- Set Value for Validation
    //   this.uploadForm.controls['codigo_usuario'].setValue(e.id_usuario ? e.id_usuario : ''); // <-- Set Value for Validation
  
    //   window.scrollTo(0,0);
    //   this.mostrar_form=true;
    //   if(e.nombreImagen!=null){
    //     this.img_editar=e['nombreImagen']
    //   }
    //   this.accionBtnFormulario="editar";
   }

    
}
  
  