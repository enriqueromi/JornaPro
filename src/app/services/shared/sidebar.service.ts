import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

// Servicio para la carga del menu lateral
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-home',
      submenu: [
        { titulo: 'Inicio', url: '/dashboard'},
        { titulo: 'Graficas', url: '/grafica1'},
        { titulo: 'Trabajando', url: '/trabajando'},
        { titulo: 'Parados', url: '/parados'},
      ]
    },
    {
      titulo: 'Mantenimmiento',
      icono: 'mdi mdi-account-multiple',
      submenu: [
        { titulo: 'Usuario', url: '/usuarios'},
        { titulo: 'Grupos', url: '/grupo'},
        { titulo: 'Trabajadores', url: '/trabajadores'},
      ]
    }

  ];


  constructor() { }
}
