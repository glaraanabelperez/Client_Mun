import { Component } from '@angular/core';
import { MarcaModel } from '../products/marcas/models/marcaModel';
import { MarcaService } from '../products/marcas/service/marca.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent {

  show:boolean;
  marcas: MarcaModel[];
  showDropdown: boolean;

  constructor( private servicesMarcas:MarcaService){
  }
  
  ngOnInit(): void {
    this.getAllMarcasActive();
  }
  public getAllMarcasActive(){
    this.servicesMarcas.getMarcas().subscribe(
      res=>{
        this.marcas=res as MarcaModel[];
      }, 
      error=>[
 
      ]
    )
  }

  showNav(){
    this.show=this.show ? false : true;
  }

  showList(){
    this.showDropdown=this.showDropdown ? false : true;
  }

}