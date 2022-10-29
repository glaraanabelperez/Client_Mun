import { Component } from '@angular/core';
import { ServiceGeneral } from './core/services/service-general.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  title = 'mi-tienda';
  
  constructor(public _service_general:ServiceGeneral){ }

  ngOnInit(): void {

  }

  subir(){
    window.scroll(0,0)
  }
  
}
