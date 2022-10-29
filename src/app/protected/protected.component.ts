import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ServiceGeneral } from 'src/app/core/services/service-general.service';
import { CategoryModel } from 'src/app/core/models/categoryModel';
import { ServiceProtected } from 'src/app/core/services/service-protected';
import { Router } from '@angular/router';
import { ProtectedService } from '../core/services/protected.service';
import { AddProduct } from './add-prod/add-prod';
import { ProductModel } from '../core/models/productModel';
import { ProductService } from '../core/services/product.service';

declare var $:any;

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})

export class ProtectedComponent implements OnInit {


  // @ViewChild(AddProduct) pup!: AddProduct;

  constructor(public _serviceProduct: ProductService, public rout :Router) {
  }

  ngOnInit(): void {
  }




 

}

