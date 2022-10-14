import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CategoryModel } from '../models/categoryModel';
import { Filter } from 'src/app/core/models/Filter';
import { OrderField } from 'src/app/core/models/OrderField';
import { QueryDataModel } from 'src/app/core/models/queryDatamodel';
import { NgForm } from '@angular/forms'
import { ProductService } from 'src/app/core/services/product.service';


@Component({
    selector: 'nav-admin',
    templateUrl: './nav-admin.html',
    styleUrls: ['./nav-admin.scss'],
  })

  export class NavAdmin implements OnInit {

    
    

    constructor(public productService:ProductService){
    

    }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }



}
  
  