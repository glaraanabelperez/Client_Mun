import { Component } from '@angular/core';
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { ServiceGeneral } from 'src/app/core/servicios-generales/service-general.service';

@Component({
  selector: 'app-cabecera-matizo',
  templateUrl: './cabecera-matizo.html',
  styleUrls: ['./cabecera-matizo.scss']
})
export class CabeceraMatizo {

  fechaHoy:any;

  constructor( public _service_metodos:ServiceMetodos){
  }
  
  ngOnInit() {
    
  }  

}