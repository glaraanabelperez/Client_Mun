import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceGeneral } from './service-general.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceProtected {

  constructor(private _servicioGeneral:ServiceGeneral) { }

  borrarArchivoServidor(img) {
    let datos=new FormData();
      datos.append('img', img); 
      datos.append('carpeta', localStorage.getItem('username'))
      this._servicioGeneral.borrarArchivoServidor(datos) 
      .subscribe(
        response => {
          if(response==true){
            alert("IMAGEN BORRADA")
          } 
        },
        error => {
          alert("ERRO AL BORRAR LA IMAGEN" + error)
        }
      );//FIN DE METODO SUBSCRIBE
    }

    public rsta;
    guardarArchivoServidor(files){
      let fileImg=new FormData();
      fileImg.append('file', files[0], files[0].name); 
      fileImg.append('carpeta', localStorage.getItem('username'))
      this._servicioGeneral.guardarArchivoServidor(fileImg)
      .subscribe(
        response => {
          this.rsta = response; 
          if(this.rsta <= 1){
            alert("ERROR EN EL SERVIDOR") 
          }else{
            if(this.rsta.code == 200 && this.rsta.status == "success"){
              alert("LA IMEGEN SE SUBIO") 
            }else{
              alert("ERROR EN EL SERVIDOR") 
            }
          }
        },
        error => {
          alert("ERROR EN EL SERVIDOR") 
        }
        );
    }

  editarDatos(form) {
    this._servicioGeneral.editarDatos(form).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){
          alert("DATOS EDITADOS")
        }else{
          alert("ERROR EN LA CONEXION")
        }
      }
    );  
  }

  insertarDatos(form){
    this._servicioGeneral.insertarDatos(form).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){
          alert("DATOS INGRESADOS") 
        }else{ 
          alert("NO SE PUDIERON INGRESAR LOS DATOS") 
          }
      }
    );
  }

  procesar(img_borrar, img_guardar, form) {
    this.borrarArchivoServidor(img_borrar);
    this.guardarArchivoServidor(img_guardar);
    this.editarDatos(form);
    alert('EDICION EXITOSA');
  }


}