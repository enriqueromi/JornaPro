import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Trabajador } from '../../models/trabajador.model';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert2';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Metodos para las peticiones al backend
export class TrabajadorService {

  totalTrabajadores : number = 0;
  totalTrabajadoresTra : number = 0;
  totalTrabajadoresPara : number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarTrabajadores(){
    let url = URL_SERVICIOS + '/trabajador';
    return this.http.get (url)
            .pipe(
              map( (resp:any) => {
                this.totalTrabajadores = resp.total;
                return resp.trabajadores;
              })
            )
  }
  
  cargarTrabajadorId(id:string){
    let url = URL_SERVICIOS + '/trabajador/'+id;
    return this.http.get(url)
                .pipe(
                  map((resp: any)=>resp.trabajador)
                );

  }

  cargarTrabajadorEstado(estado:any){
    let url = URL_SERVICIOS + '/trabajador/estado/'+estado;
    return this.http.get(url)
                .pipe(
                  map( (resp:any) => {
                    if(estado==='true'){
                      this.totalTrabajadoresTra =resp.trabajador.length;
                    }
                    if(estado==='false'){
                      this.totalTrabajadoresPara =resp.trabajador.length;
                    }
                    return resp.trabajador
                  })
                );

  }

  cargarTrabajadoresPorGrupos(grupoId:string){
    let url = URL_SERVICIOS + '/trabajador/grupos/'+grupoId;
    return this._usuarioService.http.get(url)
                                .pipe(
                                  map((resp:any)=>resp)
                                )
  }
  

  buscarTrabajadores(termino:string){

    let url = URL_SERVICIOS + '/busqueda/coleccion/trabajadores/'+termino;
    return this.http.get(url)
                  .pipe(
                    map((resp:any) => resp.trabajadores)
                  );
  }

  borrarTrabajador(id:string){
    let url = URL_SERVICIOS +'/trabajador/'+id;
    url +='?token='+this._usuarioService.token;
    return this.http.delete(url)
                  .pipe(
                    map((resp : any) =>{

                      swal.fire('Trabajador Borrado', ' Trabajador borrado correctamente', 'success');
                      return resp;
                    })
                  )
  }

  guardarTrabajador(trabajador: Trabajador){
    let url = URL_SERVICIOS +'/trabajador';

    if(trabajador._id){
      url+='/'+trabajador._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, trabajador)
                  .pipe(
                    map((resp:any) => {
                      swal.fire('Trabajador Actualizado', trabajador.nombre,'success');
                    return resp.trabajador;
                    })
                  )

    } else{
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url , trabajador)
                .pipe(
                  map((resp: any) => {
                    swal.fire('Trabajador Creado', trabajador.nombre,'success');
                    return resp.trabajador;
                  })
                )
    }

  }



}
