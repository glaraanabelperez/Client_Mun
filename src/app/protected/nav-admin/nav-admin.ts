import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Categorias } from '../../core/models/categorias';


@Component({
    selector: 'nav-admin',
    templateUrl: './nav-admin.html',
    styleUrls: ['./nav-admin.scss'],
  })

  export class NavAdmin implements OnInit {

    @Input()categorias:Categorias;
    @Output() onClicked:EventEmitter<Categorias>;
//emite al metodo elegido en lista-prod-admin.ts

    constructor(){
        this.onClicked=new EventEmitter();
    }

    ngOnInit():void {}

    ir(){
        this.onClicked.emit(this.categorias);
        return false;
      }

}
  
  