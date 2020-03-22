import { Component, OnInit } from '@angular/core';
import { DatosService, Datos } from '../services/datos.service';

@Component({
  selector: 'app-tabla-v2',
  templateUrl: './tabla-v2.component.html',
  styleUrls: ['./tabla-v2.component.scss']
})
export class TablaV2Component implements OnInit {

  constructor(private datosService : DatosService) { }

  title = 'wrapper-web';
  datos : Datos;
  private champName = "VRacer GT3 Open Seriesr";

  ngOnInit(){
     this.datosService.getAllDatos().subscribe(val => this.datos = val);
    //console.log("datos", this.datosService.getAllDatos());
  }

}
