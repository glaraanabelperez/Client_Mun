import { Component, Input, OnInit } from '@angular/core';
import { Negocio } from 'src/app/core/models/Negocio';
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fechaHoy: any;
  @Input()negocio: Negocio;

  constructor( public _servicio_metodos:ServiceMetodos) {
   }

  ngOnInit(): void {
  }

}
