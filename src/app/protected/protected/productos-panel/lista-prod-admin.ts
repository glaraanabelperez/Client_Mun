import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { ServiceGeneral } from '../../../core/servicios-generales/service-general.service';
import { Publicaciones } from 'src/app/core/models/publicaciones';
import { DOCUMENT } from '@angular/common';
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { Categorias } from 'src/app/core/models/categorias';


@Component({
    selector: 'lista-prod-admin',
    templateUrl: './lista-prod-admin.html',
    styleUrls: ['./lista-prod-admin.scss']
  })

  export class ListaProdAdmin implements OnInit {

    @Output() PasameId = new EventEmitter();

    categoriaElegida:Categorias;
    imgDefecto:string;
    p:Publicaciones;
    temp;
    user;

    constructor(private _servicioGeneral:ServiceGeneral, public _service_metodos:ServiceMetodos,
      @Inject(DOCUMENT) private document: Document) {
        this.user=localStorage.getItem('username')
     }
     
    ngOnInit(): void {
      this.categoriaElegida=this._service_metodos.getCategroiaElegida();
      this.categoriaElegidass();
    }

    categoriaElegidass(){
      this._service_metodos.categoriaSubject.subscribe((value)=>{
        this.categoriaElegida=value;
      })
    }
  
    enviarId(p){
      this.PasameId.emit(p);
      return false;
    }

    publicar(p){
      this._servicioGeneral.guardarPublicacionParaScreenShot(p);
      this.p=p; 
    }

    eliminar(p){
      this._servicioGeneral.eliminar(p).subscribe(
        datos=>{
          if(datos['resultado']=='OK'){
            alert("SE ELIMINO EXITOSAMENTE")
          }else{ 
            alert("ERROR DE CONEXION")
          }
        }
      );   
      this.document.location.reload(); 
  }

}
  
  