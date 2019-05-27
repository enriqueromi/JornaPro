import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/trabajador.model';
import { TrabajadorService } from '../../services/service.index';

@Component({
  selector: 'app-trabajadores',
  templateUrl: './trabajadores.component.html',
  styles: []
})
export class TrabajadoresComponent implements OnInit {

  trabajadores: Trabajador[] = [];
  trabajando :boolean = true;

  constructor(
    public _trabajadoresService : TrabajadorService
  ) { }

  ngOnInit() {
    this.cargarTrabajadores();
  }

  // Metodo para borrar un trabajador
  borrarTrabajador(trabajador : Trabajador){
    this._trabajadoresService.borrarTrabajador(trabajador._id)
                      .subscribe(()=> this.cargarTrabajadores())
  }

  // Metodo para cargar los trabajadores
  cargarTrabajadores(){
    this._trabajadoresService.cargarTrabajadores()
                    .subscribe( trabajadores => this.trabajadores = trabajadores);
  }

  // Metodo para la barra de busqueda
  buscarTrabajador( termino : string){

    if(termino.length<=0){
      this.cargarTrabajadores();
      return;
    }

    this._trabajadoresService.buscarTrabajadores(termino)
                      .subscribe(trabajadores => this.trabajadores = trabajadores);

  }
  
  // Metodo para picar
  cambiarEstado(trabajador : Trabajador){
    
    if(trabajador.estado){
      trabajador.estado= false;
    }
    else{
      trabajador.estado = true;
    }
    this._trabajadoresService.guardarTrabajador(trabajador)
                          .subscribe( )
    
  }

}
