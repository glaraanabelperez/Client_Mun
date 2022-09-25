import { Component, Input, OnInit } from '@angular/core';
import { Negocio } from 'src/app/core/models/Negocio';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fechaHoy: any;
  @Input()negocio: Negocio;

  constructor( ) {
   }

  ngOnInit(): void {
  }

}
