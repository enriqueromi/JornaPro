import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor() { }

  // Servicio para la apertura de la imagen

  subirArchivos( archivo : File, tipo: string , id:string){

    return new Promise((res, rej )=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append('imagen', archivo, archivo.name);
  
      xhr.onreadystatechange = function(){
        if( xhr.readyState === 4){
          if(xhr.status === 200){
            res( JSON.parse( xhr.response));
          } else{
            console.log('Fallo la subida');
            rej(xhr.response);
          }
        };
      };

      let url = URL_SERVICIOS + '/upload/' +tipo + '/'+id;

      xhr.open('PUT', url, true);
      xhr.send(formData)

    });
  }
}
