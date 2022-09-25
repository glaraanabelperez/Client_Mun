import { Component } from '@angular/core';
import { ServiceGeneral } from 'src/app/core/servicios-generales/service-general.service';

@Component({
  selector: 'app-cabecera-matizo',
  templateUrl: './cabecera-matizo.html',
  styleUrls: ['./cabecera-matizo.scss']
})
export class CabeceraMatizo {

  fechaHoy:any;

  constructor( ){
  }
  
  ngOnInit() {
    
  }  

}