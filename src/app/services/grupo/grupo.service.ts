import { Injectable } from '@angular/core';
import { Grupo } from '../../models/grupo.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

// Metodos para las peticiones al backend

export class GrupoService {

  totalGrupos: number = 0;
  grupo : Grupo;


  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarGrupo(){
    let url = URL_SERVICIOS + '/grupo'; 
    return this.http.get(url)
        .pipe(
          map((resp: any) => {
            this.totalGrupos = resp.total;
            return resp.grupos
          })
        );
  }

  obtenerGrupo(id :string){
    let url = URL_SERVICIOS +'/grupo/'+ id;
    return this.http.get(url)
                .pipe(
                  map((resp:any) => resp.grupo)
                );
  }

  borrarGrupo(id: string){
    let url = URL_SERVICIOS + '/grupo/'+ id;
    url += '?token='+ this._usuarioService.token;

    return this.http.delete(url)
                  .pipe(
                    map(resp => swal.fire('Grupo Borrado', 'Eliminado correctamente', 'success'))
                  )
                    
  }

  crearGrupo(nombre: string){
    let url = URL_SERVICIOS + '/grupo';
    url+= '?token='+ this._usuarioService.token;

    return this.http.post(url, {nombre})
                  .pipe(
                    map((resp: any) => resp.grupo)
                  )
  }
  buscarGrupo(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/grupos/'+termino;
    return this.http.get(url)
                  .pipe(
                    map((resp:any) => resp.grupos)
                  );
  }

  actualizarGrupo(grupo: Grupo){
    let url = URL_SERVICIOS+'/grupo/'+ grupo._id;
    url += '?token=' + this._usuarioService.token

    return this.http.put(url,grupo)
                .pipe(
                  map((resp: any) =>{
                    swal.fire('Grupo Actualizado' , 'Actualizacion correcta', 'success');
                    return resp.grupo;

                  } )
                );
  }


}
