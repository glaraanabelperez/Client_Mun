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

  constructor(private router: Router,private marcaService:MarcaService, 
    public loadingService:LoadingService, ){}

  ngOnInit(): void {
    this.getDiscounts();
  }

  showingModal(item:MarcaModel):void{
    this.marca = item;
    this.showModal=this.showModal ? false : true;
  } 


   //lista categorias
   public getDiscounts(){
      this.marcaService.getAllMarcas().subscribe(
        res=>{
          this.marcas=res;
          this.loadingService.setLoading(false);
          alert('BIENVENIDO');
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }

  public delete(marcaId:number){
      this.marcaService.delete(marcaId).subscribe(
        res=>{
         console.log(res)
          this.loadingService.setLoading(false);
          alert('BIENVENIDO');
        },
        error=>{
          this.loadingService.setLoading(false);
          alert('ERROR EN EL SERVIDOR');
        }
      );

  }
    
}
  
  