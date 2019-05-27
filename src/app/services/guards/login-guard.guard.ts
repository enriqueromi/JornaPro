import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  path: import("@angular/router").ActivatedRouteSnapshot[];
  route: import("@angular/router").ActivatedRouteSnapshot;

  constructor(  
    public _usuarioService: UsuarioService,
    public router : Router
    ){ 
    
  }
  canActivate(){

    if(this._usuarioService.estaLogueado()){
      return true;
    } else{
      console.log('Bloqueo del Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
