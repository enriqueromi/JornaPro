import { Component, OnInit } from '@angular/core';
import { Grupo } from '../../models/grupo.model';
import { GrupoService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// declare var swal: any;

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styles: []
})
export class GruposComponent implements OnInit {

  grupos :Grupo [] = [];
  cargando : boolean = false;

  constructor( 
    public _grupoService: GrupoService,
    public _modalUploadService:  ModalUploadService
    ) { 


  }

  ngOnInit() {
    this.cargarGrupos();

    this._modalUploadService.notificacion.subscribe(()=> this.cargarGrupos());
  }

 // Carga de los grupos
  cargarGrupos(){
    this._grupoService.cargarGrupo()
                      .subscribe((resp:any)=>{
                        this.grupos = resp;
                      })
  }

  // Guardar grupo modificado
  guardarGrupo(grupo : Grupo){
    this._grupoService.actualizarGrupo(grupo)
                      .subscribe();

  }

  // Borrar Grupo
  borrarGrupo( grupo : Grupo){
    this._grupoService.borrarGrupo(grupo._id)
                      .subscribe(()=> this.cargarGrupos());

  }

  // Buscar Grupo 
  buscarGrupo( termino : string){

    if( termino.length <= 0){
      this.cargarGrupos();
      return;
    }
    this. _grupoService.buscarGrupo(termino)
                      .subscribe(grupos => this.grupos = grupos);
  }

  // Crear Grupo 
  crearGrupo(){
    swal.fire({
      title: 'Crear grupo',
      text: 'Ingrese el nombre del grupo',
      input: 'text',
      type: "info",
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Gaurdar',
      
    }).then((result) => {

      if(!result || result.value.lenght === 0){
        return;
      }
      console.log(result.value)
      this._grupoService.crearGrupo(result.value)
                          .subscribe(()=> this.cargarGrupos());
    })
    .catch(()=>{})
  }

   // Actualizar imagen del grupo
  actualizarImagen(grupo: Grupo){
    this._modalUploadService.mostrarModal('grupos', grupo._id);
  }

}
