import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ServiceGeneral } from 'src/app/core/services/service-general.service';
import { Negocio } from '../core/models/Negocio';

@Component({
  selector: 'app-home-matizo',
  templateUrl: './home-matizo.html',
  styleUrls: ['./home-matizo.scss']
})
export class HomeMatizo {

  fechaHoy:any;
  negocios_todos:Negocio []=[];

  constructor(private  _service_g : ServiceGeneral){
    this.traer_usuarios_base();
  }
  
  ngOnInit() {
  }  

  traer_usuarios_base(){
    this._service_g.traer_usuarios()
    .then(data=>{
      this.usuarios_api(data);
    })
    .catch(err=>{
      alert("HUBO UN ERROR")
    })
  }
  usuarios_api(data) {
    let i;
    for(i=0; i<data.length; i++){
      this.negocios_todos.push(data[i]);
    }
  }

}