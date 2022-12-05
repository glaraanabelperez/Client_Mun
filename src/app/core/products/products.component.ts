import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';

import { LoadingService } from '../../services/loading.service';
import { AuthService } from 'src/app/auth-services/auth.service';

declare var $:any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {



  constructor(private _location: Location, 
    public loadingService:LoadingService, public auth:AuthService) {
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

