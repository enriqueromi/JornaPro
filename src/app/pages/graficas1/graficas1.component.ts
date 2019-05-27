import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { TrabajadorService } from 'src/app/services/service.index';
import { Trabajador } from '../../models/trabajador.model';
import { GrupoService } from '../../services/service.index';
import { Grupo } from '../../models/grupo.model';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styleUrls: ['./graficas1.component.css']
})
export class Graficas1Component implements OnInit {
  
  trabajadores: Trabajador[] = [];
  trabajadoresTra: Trabajador [] = [];
  trabajadoresPara: Trabajador [] = [];
  grupos :Grupo [] = [];
  contadorGrupo: number;
  grafica1;
  grafica2;
  cargar=false
  contador=0;


  graficaGrupoLabel: string [] =[];
  graficaGrupoNumber: number [] =[];


  
  myColors = [
    {
      backgroundColor:["#4CAF50", "#F44336", "#F44336", "#F44336", "#F44336", "#F44336", "#F44336", "#F44336", "#F44336"] 
    },
  ];

  constructor(
    public _trabajadoresService : TrabajadorService,
    public _grupoService: GrupoService
  ) {
    
   }

  ngOnInit() {
    this.cargarTrabajadoresTra();
    this.cargarTrabajadoresPara();
    this.cargarGrupos();
    this.cargarTrabajadoresPorGrupos();
    
  }

  cargarTrabajadoresTra(){
    this._trabajadoresService.cargarTrabajadorEstado('true')
                    .subscribe( (trabajadores:any) =>{
                    this.trabajadoresTra = trabajadores;
                    this.grafica1 = {'grafico1': {
                      'labels': ['Trabajando','Parado'],
                      'data':  [this.trabajadoresTra.length],
                      'type': 'doughnut',
                      'leyenda': 'Trabajadores ',
                      'colors': this.myColors
                    }}
                    });

  }
  cargarTrabajadoresPara(){
    this._trabajadoresService.cargarTrabajadorEstado('false')
        .subscribe( (trabajadores:any) =>{
        this.trabajadoresPara =trabajadores;
        this.grafica1.grafico1.data.push(this.trabajadoresPara.length)
    });
  
  }

  cargarGrupos(){
    this._grupoService.cargarGrupo()
                      .subscribe((resp:any)=>{
                        this.grupos = resp;
                      })
  }


  

  cargarTrabajadoresPorGrupos(){
    
    for (let i = 0; i < this.grupos.length; i++) {
    this._trabajadoresService.cargarTrabajadoresPorGrupos(this.grupos[i]._id)
                          .subscribe((resp:any)=>{
                            this.graficaGrupoNumber.push(resp.casa);
                            this.graficaGrupoLabel.push(resp.contador);  
                            this.contador++;
                          })
                          
    }
    // console.log(this.graficaGrupoLabel);
    // console.log(this.graficaGrupoNumber)
    this.grafica2 = {'grafico2': {
      'labels': [this.graficaGrupoLabel],
      'data':  [this.graficaGrupoNumber],
      'type': 'doughnut',
      'leyenda': 'Trabajadores ',
      'colors': this.myColors
    }}
    if(this.contador===this.grupos.length){
      this.cargar=true;
    }
    console.log(this.cargar)
  }

}
