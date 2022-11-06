import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  VerPedido

  chosenStore: string;

  constructor(private rutaActiva: ActivatedRoute){
    this.chosenStore=this.rutaActiva.snapshot.params.nombre;
  }
  
  ngOnInit() {}
       

 
  
   


}