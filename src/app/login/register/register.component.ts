import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login.component.css']
})
export class RegisterComponent implements OnInit {

  forma : FormGroup;

  constructor(
  public _usuarioService: UsuarioService,
  public router: Router
  ) { }


  // Metodo para controlar los campos de contraseña y repetir contrasña son iguales
  sonIguales( campo1: string, campo2: string){

    return (group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2){
        return null;
      }
      return {
        sonIguales : true
      };

    };
  }


  ngOnInit() {
    init_plugins();

  // Control de restricciones del formulario
    this.forma = new FormGroup({
      nombre: new FormControl( null , Validators.required),
      correo: new FormControl( null , [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false)
    }, {validators: this.sonIguales('password', 'password2') })


    // Carga de un modelo de testeo

    this.forma.setValue({
      nombre : 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones : true
    })

  }


  // Metodo de subcripcion al http para guardar el registro en la base de datos

  registrarUsuario(){

    if(this.forma.invalid){
      return;
    }
    else if(!this.forma.value.condiciones){
      Swal.fire("Importante", "Debe de aceptar las condiciones", "warning");
      return;
    }else{
      let usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.correo,
        this.forma.value.password
      );

      this._usuarioService.crearUsuario(usuario).subscribe(resp => this.router.navigate(['/login']))

    }
    console.log('Usuario Registrado')
  }

}
