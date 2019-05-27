import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

// Llamada a script fuera de angular
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email : string;
  recuerdame: boolean = false;


  constructor(
    public router: Router,
    public _usarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();

    // Guardado en el localStorage el email al marcar la casilla recuerdame
    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

  // Validacion para logearse

  ingresar( forma: NgForm){
    if(forma.invalid){
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password );
    this._usarioService.login(usuario, forma.value.recuerdame)
                    .subscribe(() => this.router.navigate(['/dashboard']))
  }
}
