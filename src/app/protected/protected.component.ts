import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ServiceGeneral } from 'src/app/core/services/service-general.service';
import { CategoryModel } from 'src/app/protected/models/categoryModel';
import { Productos } from 'src/app/core/models/productos';
import { ServiceProtected } from 'src/app/core/services/service-protected';
import { Router } from '@angular/router';
import { ProtectedService } from '../core/services/protected.service';
import { AddProduct } from './add-prod/add-prod';

declare var $:any;

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})

export class ProtectedComponent implements OnInit {

  public product :Productos;
  private codigo_usuario: string;
  private pricePercent:number;

  private categorySelect: CategoryModel;

  @ViewChild(AddProduct) pup!: AddProduct;
  loading: boolean;

  constructor(public _serviceProtected : ProtectedService, public rout :Router) {

  }

  ngOnInit(): void {
  }

  changePrice(){
    // this._servicioGeneral.changePrice(this.pricePercent, this.codigo_usuario);
  }

  subir(){
    window.scroll(0,0)
  }

  categorySelected(d :CategoryModel){
    this.categorySelect=d;
  }

  editarProduct(product:Productos){
    this._serviceProtected.product=product;
    this.rout.navigateByUrl('/formulario');
  }
 

}

