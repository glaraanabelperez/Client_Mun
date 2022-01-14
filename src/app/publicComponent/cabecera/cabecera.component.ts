import { Component, OnInit , Input} from '@angular/core';
import { AuthService } from '../../auth-services/auth.service';
import { Observable, of as observableOf, Subject } from 'rxjs'; // since RxJs 6
import { ServiceMetodos } from 'src/app/core/servicios-generales/service-general.metodos';
import { Negocio } from 'src/app/core/models/Negocio';


@Component({
    selector: 'cabecera-component',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.scss']
  })
  export class CabeceraComponent implements OnInit {
    @Input()negocio: Negocio;
    mostrar=false;

    constructor(public authService: AuthService, public _service_metodos:ServiceMetodos) {
    }
     
    ngOnInit(): void {
    }
    
    method(): Observable<boolean> {
      if (this.authService.isLoggedIn() === false){
        return observableOf(false);
      }else{
        return observableOf(true);
      }
    }

}
  
  