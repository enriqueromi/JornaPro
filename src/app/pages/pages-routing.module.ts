import {RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';

import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GruposComponent } from './grupos/grupos.component';
import { TrabajadorComponent } from './trabajadores/trabajador.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { TrabajandoComponent } from './trabajando/trabajando.component';
import { ParadosComponent } from './parados/parados.component';


//  Ruttas para manejar la navegacion
const pagesRoutes: Routes = [

          {path : 'dashboard', component: DashboardComponent, data: { titulo: 'Inicio'} },
          {path : 'grafica1', component: Graficas1Component, data: { titulo: 'Gráficas'} },
          {path : 'account-settings', component: AccoutSettingsComponent , data: { titulo: 'Ajustes del Tema'}},
          {path : 'perfil', component: ProfileComponent , data: { titulo: 'Perfil de usuario'}},
          // Mantenimientos
          {path : 'usuarios', component: UsuariosComponent , data: { titulo: 'Mantenimiento de Usuarios'}},
          {path : 'grupo', component: GruposComponent , data: { titulo: 'Mantenimiento de Grupos'}},
          {path : 'trabajadores', component: TrabajadoresComponent , data: { titulo: 'Mantenimiento de Trabajador'}},
          {path : 'trabajador/:id', component: TrabajadorComponent , data: { titulo: 'Actualizar Trabajador'}},
          {path : 'trabajando', component: TrabajandoComponent , data: { titulo: 'Personal Trabajando'}},
          {path : 'parados', component: ParadosComponent , data: { titulo: 'Personal Parado'}},
          {path : '', redirectTo: 'dashboard', pathMatch: 'full'},
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
