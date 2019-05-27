import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SubirArchivosService } from '../../services/subirarchivos/subir-archivos.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imagenSubir: File;
  imagenTemp: any;

  constructor(
    public _subirArchivosService : SubirArchivosService,
    public _modalUploadService: ModalUploadService
    ) 
    { 
  }

  ngOnInit() {
  }


  // Subcriones a la llamada http del backend para obtener los datos deseados


  // Subida de imagen a la base de datos
  subirImagen(){
    this._subirArchivosService.subirArchivos(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
          .then(resp => {
            this._modalUploadService.notificacion.emit(resp);
            this.cerrarModal();
          })
          .catch(err =>{
            console.log('Error en la carga.. ')
          })
  }

  // Metodo para cerrar la ventana 
  cerrarModal(){
    this.imagenTemp= null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  // Control de error y selecion de imagen del explorador

  seleccionImagen(archivo : File){

    if(!archivo){
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image')<0){
      swal.fire('Solo imágenes', 'El archivo seleccionado no es una imagen' , 'error');
      this.imagenSubir= null;
      return
    }

    this.imagenSubir = archivo;
    
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = ()=> this.imagenTemp = reader.result;
  }

}
