import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { SubirArchivosService } from '../subirarchivos/subir-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token : string;

  constructor(public http: HttpClient, public router :Router , public _subirArchivoService: SubirArchivosService) { 
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length >5 )? true : false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }


  guardarStorage( id: string, token: string, usuario : Usuario){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario',JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login(usuario : Usuario, recordar : boolean = false){
    if(recordar ){
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS +'/login';
    return this.http.post(url, usuario)
                  .pipe(
                  map((resp: any) => {
                    this.guardarStorage(resp.id, resp.token, resp.usuario);
                    return true;
                  }));
  }

  crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuarios';
    return this.http.post(url , usuario)
        .pipe(
          map((resp: any) => {
            Swal.fire('Usuario creado', usuario.email, 'success' );
              return resp.usuario;
          }));

  }

  actualizarUsuario( usuario: Usuario){
    let url = URL_SERVICIOS + '/usuarios/'+usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
                  .pipe(
                    map((resp: any) =>{

                      if(usuario._id === this.usuario._id){
                        this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
                      }
                      swal.fire('Usuario actualizado', usuario.nombre, 'success');

                      return true;
                    }));
  }
  
  cambiarImagen(archivo : File, id : string){
    this._subirArchivoService.subirArchivos(archivo, 'usuarios', id)
          .then((resp: any) => {
            this.usuario.img = resp.usuario.img;
            swal.fire('Imagen actualizada', this.usuario.nombre, 'success');

            this.guardarStorage(id, this.token, this.usuario);

          })
          .catch(resp => {
            console.log(resp);
          });
  }

  cargarUsuarios( desde: number=0){
    let url = URL_SERVICIOS + '/usuarios?desde='+ desde;

    return this.http.get(url);
  }

  buscarUsuarios(termino:string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url)
                  .pipe(
                    map((resp:any) => resp.usuarios)
                  );
  }

  borrarUsuario(id:string){
    let url = URL_SERVICIOS +'/usuarios/'+id;
    url +='?token='+this.token;
    return this.http.delete(url);
  }


}
