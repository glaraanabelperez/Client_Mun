import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth-services/auth.service';
import {Router} from '@angular/router';
import { LoginRequest, LoginResponse } from 'src/app/auth-services/login';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-inWjn.component.html',
  styleUrls: ['./log-inWjn.component.scss']
})
export class LogInComponent implements OnInit {

  mensajerror:String;
  titulo="";
  constructor( public authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login( username: string, password: string) :boolean {
    let data:LoginRequest={
      Email:username,
      Password:password
    }
    this.mensajerror="";
    this.authService.login(data).subscribe(
      res=>{
        this.authService.register(res);
        alert('BIENVENIDO');
      },
      error=>{
        alert('EL USUARIO NO SE ENCUENTRA REGISTRADO');
      }
    );

    return false;
  }

  logOut() :boolean{
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }


}
