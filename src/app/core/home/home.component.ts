import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrderService } from 'src/app/orders/service/order.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CategoryModel } from '../products/categories/models/categoryModel';
import { CatgeorieService } from '../products/categories/service/categorie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  categorias: CategoryModel[];


  constructor(private serviceCategorias:CatgeorieService, public loadingService:LoadingService, private rutaActiva:ActivatedRoute,
    public _serviceOrder:OrderService, private router: Router){
  }
  
  ngOnInit(): void {
    this.getAllMarcasActive();
    if(this.rutaActiva.snapshot.queryParams.collection_id ){
      alert("Gracias por su compra")
      this._serviceOrder.getPayment(this.rutaActiva.snapshot.queryParams.collection_id).subscribe(
        res=>{
          alert("Recuerde su numero de compra es: " + res);  
          this.router.navigate(['home']);
        },
        error=>{
          alert('ERROR DE SERVIDOR');
          this.loadingService.setLoading(false);
        }
      );
    }

  }
  public getAllMarcasActive(){
    this.loadingService.setLoading(true);
    this.serviceCategorias.list().subscribe(
      res=>{
        this.loadingService.setLoading(false);
        this.categorias=res as CategoryModel[];
      }, 
      error=>{
        this.loadingService.setLoading(false);
      }
    )
  }
       

 
  
   


}