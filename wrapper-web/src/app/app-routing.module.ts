import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablaComponent } from './tabla/tabla.component';
import { CargarCampeonatoComponent } from './cargar-campeonato/cargar-campeonato.component';
import { HomeComponent } from './home/home.component';
import { TablaV2Component } from './tabla-v2/tabla-v2.component';
import { TablaV2EquiposComponent } from './tabla-v2-equipos/tabla-v2-equipos.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tabla', component: TablaComponent },
  { path: 'tablav2/:categoria/:numerofecha', component: TablaV2Component },
  { path: 'tablav2equipos/:categoria/:numerofecha', component: TablaV2EquiposComponent },
  { path: 'cargarCampeonato', component: CargarCampeonatoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
