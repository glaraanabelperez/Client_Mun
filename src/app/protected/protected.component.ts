import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

import { ProductService } from '../core/services/product.service';
import { AuthService } from '../auth-services/auth.service';
import { LoadingService } from '../core/services/loading.service';

declare var $:any;

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})

export class ProtectedComponent implements OnInit {


  // @ViewChild(AddProduct) pup!: AddProduct;

  constructor(public _serviceProduct: ProductService, public rout :Router, private _location: Location ,
    private auth:AuthService, public loadingService:LoadingService, ) {
  }

  ngOnInit(): void {
  }

  goBack(){
    this._location.back();
  }

  public  isLogin():boolean{
    return this.auth.isLoggedIn()
  }



 

}

