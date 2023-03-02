import { Component, OnInit , Output, EventEmitter, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { MarcaModel } from './models/marcaModel';
import { MarcaService } from './service/marca.service';




@Component({
    selector: 'app-marcas',
    templateUrl: './marcas.component.html',
    styleUrls: ['./marcas.component.scss']
  })

  export class MarcasComponent implements OnInit {

 
  public marca: MarcaModel;
  public marcas:MarcaModel[]=[];
  public showModal:boolean;

  constructor(private router: Router, private marcaService:MarcaService, 
    public loadingService:LoadingService, ){}

  ngOnInit(): void {
    this.getMarcas();
  }

  showingModal(item:MarcaModel):void{
    this.marca = item;
    if(this.showModal){
      this.showModal=false;
      this.getMarcas();
    }else{
      this.showModal=true;
      window.scroll(0,0);
    }
  } 


   //lista categorias
   public getMarcas(){
    this.loadingService.setLoading(true);

      this.marcaService.getMarcas().subscribe(
        res=>{
          this.marcas=res;
          this.loadingService.setLoading(false);
        },
        error=>{
          this.loadingService.setLoading(false);
          alert(this.loadingService.error);
        }
      );

  }

  public delete(marcaId:number){
    this.loadingService.setLoading(true);

      this.marcaService.delete(marcaId).subscribe(
        res=>{
          this.loadingService.setLoading(false);
          alert('Dato Eliminado');
          this.getMarcas();
        },
        error=>{
          this.loadingService.setLoading(false);
          alert("ERROR EN EL SERVIDOR");
        }
      );

  }
    
}
  
  