import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ServiceGeneral } from 'src/app/core/servicios-generales/service-general.service';
import { Categorias } from 'src/app/core/models/categorias';
import { Publicaciones } from 'src/app/core/models/publicaciones';
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { ServiceProtected } from 'src/app/core/servicios-generales/service-protected';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})

export class ProtectedComponent implements OnInit {

  
  publicacionEditar: Publicaciones[] = [];
  uploadForm: FormGroup;
  mostrar_form: boolean;
  accionBtnFormulario:string;
  imagenNueva_guardar: File;
  imgNueva_mostrar: any;
  img_editar: any;
  message: string;
  codigo_usuario: string;
  user: string;
  pricePercent:number;
  estado: String[]=[];
  fechaHoy:any;

  constructor( private _servicioGeneral:ServiceGeneral, public _serviceMetodos : ServiceMetodos, private formBuilder:FormBuilder,
     @Inject(DOCUMENT) private document: Document, public _service_protected:ServiceProtected,private router: Router) {

    this.estado= _servicioGeneral.obtener_estado();
    this.user=localStorage.getItem('username'); 
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
        fechaAlta:[this.fechaHoy],
        precio:[null],
        destacada:[''],
        promocion:[''],
        codigo_usuario:[this.codigo_usuario],
      });
  }

  ngOnInit(): void {
    this.traerCategorias();
    this.traerPublicaciones();
    alert("Aguarde, 'Cargando productos'")
  }

  changePrice(){
    this._servicioGeneral.changePrice(this.pricePercent, this.codigo_usuario);
  }
// VARIOS
  subir(){
    window.scroll(0,0)
  }
  getFecha(){
    var d = new Date();
    this.fechaHoy = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
  }
  mostrar(){
    if(this.mostrar_form==true){
      this.mostrar_form=false;
    }else{
      this.mostrar_form=true;
    }
  }
  get f(){ return this.uploadForm.controls;}
  
  //CATEGORIAS NAV PROTECTED
  traerCategorias(){
    if(localStorage.getItem('codigo_usar')==undefined){
      alert('VUELVA A INGRESAR USUARIO Y PASSWORD')
      this.router.navigateByUrl('login')
    }
      this._serviceMetodos.obtenerCategoria(localStorage.getItem('codigo_usar'))
  }
  elegido(d :Categorias){
    this._serviceMetodos.setCatgeoriasElegida(d);
    this._serviceMetodos.suscribeOnChange(d);
  }
  //PUBLICACIONES
  traerPublicaciones(){
      this._serviceMetodos.traerDatosPublicaciones_servicio(localStorage.getItem('codigo_usar'))
  }
  // IMAGEN 
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
        this._service_protected.procesar(this.img_editar,this.imagenNueva_guardar, this.uploadForm.value );
      }
      if(this.imgNueva_mostrar==null){
        this._service_protected.editarDatos(this.uploadForm.value);
        alert('Publicacion Editada');
      }  
    }
    if(this.accionBtnFormulario=="nuevo"){
      if(this.imgNueva_mostrar!=null){
        this._service_protected.guardarArchivoServidor(this.imagenNueva_guardar);
      }
      this._service_protected.insertarDatos(this.uploadForm.value);
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

editarPubliId(e: Publicaciones){
  this.uploadForm.controls['codigo_producto'].setValue(e.codigo_producto ? e.codigo_producto: ''); // <-- Set Value for Validation
  this.uploadForm.controls['categorias'].setValue(e.categorias ? e.categorias: ''); // <-- Set Value for Validation
  this.uploadForm.controls['estado'].setValue(e.estado ? e.estado : ''); // <-- Set Value for Validation
  this.uploadForm.controls['titulo'].setValue(e.titulo ? e.titulo : ''); // <-- Set Value for Validation
  this.uploadForm.controls['subtitulo'].setValue(e.subtitulo ? e.subtitulo : ''); // <-- Set Value for Validation
  this.uploadForm.controls['descripcion'].setValue(e.descripcion ? e.descripcion : ''); // <-- Set Value for Validation
  this.uploadForm.controls['nombreImagen'].setValue(e.nombreImagen ? e.nombreImagen : ''); // <-- Set Value for Validation
  this.uploadForm.controls['fechaAlta'].setValue(e.fechaAlta ? e.fechaAlta : ''); // <-- Set Value for Validation
  this.uploadForm.controls['precio'].setValue(e.precio ? e.precio : ''); // <-- Set Value for Validation
  this.uploadForm.controls['destacada'].setValue(e.destacada ? e.destacada : ''); // <-- Set Value for Validation
  this.uploadForm.controls['promocion'].setValue(e.promocion ? e.promocion : ''); // <-- Set Value for Validation
  this.uploadForm.controls['codigo_usuario'].setValue(e.codigo_usuario ? e.codigo_usuario : ''); // <-- Set Value for Validation

  window.scrollTo(0,0);
  this.mostrar_form=true;
  if(e.nombreImagen!=null){
    this.img_editar=e['nombreImagen']
  }
  this.accionBtnFormulario="editar";
}

}

