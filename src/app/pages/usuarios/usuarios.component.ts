import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios : Usuario[] = [];
  desde: number = 0;

  totalRegitros: number = 0;
  cargando: boolean = true;


  constructor( 
    public _usuarioService : UsuarioService,
    public _modalUploadService : ModalUploadService
    ) { }

  ngOnInit() {
    this.cargarUsuario();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuario());
  }

  cargarUsuario(){
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
                      .subscribe((resp:any) => {
                        this.totalRegitros = resp.total;
                        this.usuarios = resp.usuarios;
                        this.cargando= false;
                      }) 
  };

  cambiarDesde(valor : number){
    let desde= this.desde + valor;

    if(desde >= this.totalRegitros){
      return;
    }
    if(desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarUsuario();
  }
  // Metodo para buscar el usuario
  buscarUsuario(termino:string){

    if(termino.length <=0){
      this.cargarUsuario();
      return;
    }
    this.cargando= true;

    this._usuarioService.buscarUsuarios(termino)
                      .subscribe((usuarios: Usuario[])=>{
                        this.usuarios = usuarios;
                        this.cargando = false;
                      })
  }

  //Metodo para borrar el usuario
  borrarUsuario(usuario: Usuario){
    if(usuario._id === this._usuarioService.usuario._id){
      swal.fire('No puede borrar el usuario','No se puede borrar a si mismo','error');
      return;
    }

    swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta a punto a borrar a '+usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
                            .subscribe(()=>this.cargarUsuario());
        swal.fire(
          'Borrardo!',
          'EL usuario a sido borrado',
          'success'
        );
      }
    });
  }

  // Metodo para guardar Usuario
  guardarUsuario(usuario: Usuario){
    this._usuarioService.actualizarUsuario(usuario)
          .subscribe();
  }

  // Metodo para mostrar modal para modificar la imagen
  mostrarModal(id : string){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
