import { Component } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.html',
  styleUrls: ['./cabecera.scss']
})
export class Cabecera {

  show:boolean;

  constructor( ){
  }
  
  ngOnInit() {
    
  }  
  showNav(){
    this.show=this.show ? false : true;
  }

}