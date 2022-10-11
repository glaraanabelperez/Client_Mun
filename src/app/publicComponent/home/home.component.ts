import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Negocio } from 'src/app/core/models/Negocio';
import { ServiceGeneral } from 'src/app/core/services/service-general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  VerPedido

  store:Negocio;
  chosenStore: string;
  stores:Negocio []=[];

  constructor(private  _service_g : ServiceGeneral, private rutaActiva: ActivatedRoute){
    this.chosenStore=this.rutaActiva.snapshot.params.nombre;
    this.getStores();  
  }
  
  ngOnInit() {}
       

  getStores(){
    this._service_g.traer_usuarios()
    .then(data=>{
      console.log("aca", data)
      this.completeArrayStores(data);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  completeArrayStores(data) {
    let i;
    for(i=0; i<data.length; i++){
      this.stores.push(data[i]);
      this.stores.values
    }
    this.verificarNegocio();
  }

    verificarNegocio(){
        // let i;
        // for(i=0; i<this.stores.length; i++){
        //   if(this.stores[i].nombre_negocio==this.chosenStore){ 
        //     this.store=this.stores[i];
        //     this._service_metodos.setNegocio(this.store);
        //   }
        // }
        //   // this._service_metodos.obtenerCategoria( this.store.id);
        //   this.traerPublicaciones();
    }
    //PUBLICACIONES
    traerPublicaciones(){
        // this._service_metodos.traerDatosPublicaciones_servicio(this.store.id)
    }

}