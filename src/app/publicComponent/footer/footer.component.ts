import { Component, Input, OnInit } from '@angular/core';
import { MarcaModel } from '../products/marcas/models/marcaModel';
import { MarcaService } from '../products/marcas/service/marca.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  fechaHoy: any;
  marcas: MarcaModel[]=[];

  constructor( private servicesMarcas:MarcaService) {
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
}
