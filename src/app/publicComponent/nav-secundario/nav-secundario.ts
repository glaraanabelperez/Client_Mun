import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Categorias } from '../../core/models/categorias';


@Component({
    selector: 'nav-secundario',
    templateUrl: './nav-secundario.html',
    styleUrls: ['./nav-secundario.scss'],
  })

  export class NavSecundario implements OnInit {
    @Input()categoria:Categorias;
    @Output() onClicked:EventEmitter<Categorias>;

    constructor(){
        this.onClicked=new EventEmitter();
    }

    ngOnInit():void {
    }

    ir(){
        this.onClicked.emit(this.categoria);
        window.scroll(0,0)
        return false;
      }

}
  
  