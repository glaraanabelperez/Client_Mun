import { Component, OnInit , Input} from '@angular/core';
import { AuthService } from '../../auth-services/auth.service';
import { Observable, of as observableOf, Subject } from 'rxjs'; // since RxJs 6


@Component({
    selector: 'cabecera-component',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.component.scss']
  })
  export class CabeceraComponent implements OnInit {
    mostrar=false;

    constructor(public authService: AuthService) {
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
  
  