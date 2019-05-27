import { Component, OnInit } from '@angular/core';
import { Trabajador } from '../../models/trabajador.model';
import { TrabajadorService } from '../../services/trabajador/trabajador.service';

@Component({
  selector: 'app-trabajando',
  templateUrl: './trabajando.component.html',
  styles: []
})
export class TrabajandoComponent implements OnInit {
  
  trabajadores: Trabajador[] = [];


  constructor(
    public _trabajadoresService : TrabajadorService

  ) { }

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
    this._trabajadoresService.cargarTrabajadorEstado('true')
                    .subscribe( (trabajadores:any) =>{
                    this.trabajadores = trabajadores;
                   
                    
                    });


  }

}
