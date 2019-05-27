import { Component, OnInit } from '@angular/core';
import { TrabajadorService } from 'src/app/services/service.index';
import { Trabajador } from '../../models/trabajador.model';

@Component({
  selector: 'app-parados',
  templateUrl: './parados.component.html',
  styles: []
})
export class ParadosComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  constructor(
    public _trabajadoresService : TrabajadorService
  ) {
    console.log()
   }

  ngOnInit() {
    this.cargarTrabajadores()
  }

  buscarTrabajador( termino : string){

    if(termino.length<=0){
      this.cargarTrabajadores();
      return;
    }

    this._trabajadoresService.buscarTrabajadores(termino)
                      .subscribe(trabajadores => this.trabajadores = trabajadores);

  }

  cargarTrabajadores(){
    this._trabajadoresService.cargarTrabajadorEstado('false')
                    .subscribe( (trabajadores:any) =>{
                    this.trabajadores = trabajadores;
                   
                    
                    });


  }
}
