import { Component } from '@angular/core';
import {DatosService} from './services/datos.service';

export interface Datos {
  pos : [];
  nombre: [];
  puntos: [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private datosService : DatosService){}
  title = 'wrapper-web';
  datos : Datos;

  ngOnInit(){
     this.datosService.getAllDatos().subscribe(val => this.datos = val);
    //console.log("datos", this.datosService.getAllDatos());
  }
}

