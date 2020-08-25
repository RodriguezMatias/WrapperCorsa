import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {DatosService} from './services/datos.service';

import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { CargarCampeonatoComponent } from './cargar-campeonato/cargar-campeonato.component';
import { HomeComponent } from './home/home.component';
import { TablaV2Component } from './tabla-v2/tabla-v2.component';
import { FormsModule } from '@angular/forms';
import { TablaV2EquiposComponent } from './tabla-v2-equipos/tabla-v2-equipos.component';


@NgModule({
  declarations: [
    AppComponent,
    CargarCampeonatoComponent,
    HomeComponent,
    TablaV2EquiposComponent,
    TablaV2Component
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    DatosService,
    HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
