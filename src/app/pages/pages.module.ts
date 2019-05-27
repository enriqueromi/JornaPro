import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages-routing.module';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

//Pipe Module
import { PipesModule } from '../pipes/pipes.module';

// Temporal
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GruposComponent } from './grupos/grupos.component';
import { TrabajadoresComponent } from './trabajadores/trabajadores.component';
import { TrabajadorComponent } from './trabajadores/trabajador.component';
import { TrabajandoComponent } from './trabajando/trabajando.component';
import { ParadosComponent } from './parados/parados.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        Graficas1Component,
        GraficoDonaComponent,
        AccoutSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        // ModalUploadComponent,
        GruposComponent,
        TrabajadoresComponent,
        TrabajadorComponent,
        TrabajandoComponent,
        ParadosComponent
    ],
    exports: [
        DashboardComponent,
        Graficas1Component
    ],
    imports : [
        CommonModule,
        PipesModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})
export class PagesModule {

}
