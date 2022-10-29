import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { CategoryModel } from 'src/app/core/models/categoryModel';


@Component({
    selector: 'nav-secundario',
    templateUrl: './nav-secundario.html',
    styleUrls: ['./nav-secundario.scss'],
  })

  export class NavSecundario implements OnInit {
    @Input()category:CategoryModel;
    @Output() onClicked:EventEmitter<CategoryModel>;

    constructor(){
        this.onClicked=new EventEmitter();
    }

    ngOnInit():void {
    }

    ir(){
        this.onClicked.emit(this.category);
        window.scroll(0,0)
        return false;
      }

}
  
  