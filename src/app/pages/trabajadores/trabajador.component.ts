import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Grupo } from '../../models/grupo.model';
import { TrabajadorService } from '../../services/service.index';
import { GrupoService } from '../../services/service.index';
import { Trabajador } from '../../models/trabajador.model';
import swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styles: []
})
export class TrabajadorComponent implements OnInit {

  grupos : Grupo[]= [];
  trabajador :Trabajador = new Trabajador('','','','','');
  grupo:Grupo = new Grupo('');
  constructor(
    public _trabajadorService: TrabajadorService,
    public _grupoService: GrupoService,
    public router :Router,
    public activateRouter: ActivatedRoute,
    public _modalUploadService : ModalUploadService
  ) {
    activateRouter.params.subscribe(params =>{
      let id = params['id'];

      if(id!=='nuevo'){
        this.cargarTrabajadorId(id);
      }
    })
   }

  ngOnInit() {
    this._grupoService.cargarGrupo()
                    .subscribe(grupos => this.grupos = grupos);

    this._modalUploadService.notificacion
                .subscribe(resp=>{
                  this.trabajador.img = resp.trabajador.img;
                })
  }

  // Metodo para cargar los datos del trabajador que se modificara o crear
  cargarTrabajadorId(id:string){
    this._trabajadorService.cargarTrabajadorId(id)
                    .subscribe(trabajador => {
                      this.trabajador = trabajador;
                      this.trabajador.grupo = trabajador.grupo._id;
                      this.cambioGrupo(this.trabajador.grupo);
                    })
  }

  // Metodo para grardar los cambios
  guardarTrabajador(f:NgForm){
    if(f.invalid){
      swal.fire('Trabajador incorrecto', 'Compruebe los datos introducidos','warning')
      return;
    }

    this._trabajadorService.guardarTrabajador(this.trabajador)
                      .subscribe(trabajador =>{
                        this.trabajador._id = trabajador._id;
                        this.router.navigate(['/trabajador',trabajador._id]);
                      })
  }

  // Metodo para cambiar el grupo
  cambioGrupo(id:string){
    this._grupoService.obtenerGrupo(id)
                      .subscribe(grupo =>{
                        this.grupo = grupo;
                      })
  }

  // Metodo para cambiar la foto
  cambiarFoto(){

    this._modalUploadService.mostrarModal('trabajadores', this.trabajador._id);

  }


}
