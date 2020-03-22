import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {DatosService} from './services/datos.service';

import { HttpClient } from '@angular/common/http';

import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TablaComponent } from './tabla/tabla.component';
import { Routes, RouterModule } from '@angular/router';
import { CargarCampeonatoComponent } from './cargar-campeonato/cargar-campeonato.component';
import { HomeComponent } from './home/home.component';
import { TablaV2Component } from './tabla-v2/tabla-v2.component';


@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    CargarCampeonatoComponent,
    HomeComponent,
    TablaV2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    DatosService,
    HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
