import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ServiceGeneral } from 'src/app/core/servicios-generales/service-general.service';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { Productos } from 'src/app/core/models/productos';
import { ServiceProtected } from 'src/app/core/servicios-generales/service-protected';
import { Router } from '@angular/router';
import { ProtectedService } from './protected.service';

declare var $:any;

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})

export class ProtectedComponent implements OnInit {

  editProduct :Productos;
  // publicacionEditar: Productos[] = [];
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

  private categorySelect: CategoryModel;

  constructor( private _servicioGeneral:ServiceGeneral, public _serviceProtected : ProtectedService, private formBuilder:FormBuilder,
     @Inject(DOCUMENT) private document: Document,) {

    
  }

  ngOnInit(): void {
    // this.traerProductos();
    alert("Aguarde, 'Cargando productos'")
  }

  changePrice(){
    this._servicioGeneral.changePrice(this.pricePercent, this.codigo_usuario);
  }
// VARIOS
  subir(){
    window.scroll(0,0)
  }

  mostrar(){
    if(this.mostrar_form==true){
      this.mostrar_form=false;
    }else{
      this.mostrar_form=true;
    }
  }
  
 
  categorySelected(d :CategoryModel){
    this.categorySelect=d;
    // this._serviceProtected.setCatgeoriasElegida(d);
    // this._serviceProtected.suscribeOnChange(d);
  }

  //Productos
  // traerProductos(){
  //     this._serviceMetodos.traerDatosProductos_servicio(localStorage.getItem('codigo_usar'))
  // }
  // IMAGEN 

  editarPubliId(publ:Productos){
    this.editProduct=publ;
  }
 

}

