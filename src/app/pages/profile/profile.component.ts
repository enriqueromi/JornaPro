import { Component, OnInit, ɵConsole } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import  swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario : Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  // Actualizar los dato del usuario logueado 
  guardar(usuario: Usuario){

    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._usuarioService.actualizarUsuario(this.usuario)
                    .subscribe();
  }

  // Metodo para selecionar la foto del usuario
  seleccionImagen(archivo : File){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image')<0){
      swal.fire('Solo imágenes', 'El archivo seleccionado no es una imagen' , 'error');
      this.imagenSubir= null;
      return
    }

    this.imagenSubir = archivo;
    
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp = reader.result;
  }

  // Metoto para cambiar la imagen del usuario
  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
