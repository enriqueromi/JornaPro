import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto : string= 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { 
  }

  // Metodo apara ocualtar el modal de subida de imagenes

  ocultarModal(){
    this.oculto= 'oculto';
    this.tipo = null;
    this.id= null;
  }

  // Metodo para mostrar el modal de subida de imagenes y saber los datos del la coleccion que la que se cargara

  mostrarModal(tipo :string, id:string){
    this.oculto='';
    this.id = id;
    this.tipo = tipo;
  }
}
