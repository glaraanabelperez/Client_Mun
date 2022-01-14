import { Component,  OnInit} from '@angular/core';
import { ServiceGeneral } from 'src/app/core/servicios-generales/service-general.service';
import { Publicaciones } from 'src/app/core/models/publicaciones';
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { ServicePedidos } from 'src/app/core/servicios-pedidos/service-pedidos.service';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent implements OnInit {
  destacada :Publicaciones[] = [];

  constructor(private _servicioG:ServiceGeneral, public _service_metodos:ServiceMetodos, public _servicioPedidos:ServicePedidos) {
    this.traerDestacadas();
   }
   
  ngOnInit(): void {
  }

  traerDestacadas(){
      this._servicioG.traerDestacadas(this._service_metodos.negocio.codigo_usuario).subscribe(res => { 
        this.mostrarDestacadas(res);
     })
  }

  mostrarDestacadas(res:[]){
    if(res.length!=0){
      for(let i=0;i<res.length;i++){
        this.destacada.push(res[i]);
        this.destacada.values;
       }
    }
     
  }
  agregarPedido(p){
    let pedido={
    codigo_producto: p.codigo_producto,
    cantidad:1,
    titulo:p.titulo,
    precio:p.precio,
  }
    this._servicioPedidos.agregarPedido(pedido);
}

}
