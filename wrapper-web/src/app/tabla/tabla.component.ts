import { Component, OnInit } from '@angular/core';
import { DatosService, Datos } from '../services/datos.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  constructor(private datosService : DatosService) { }

  title = 'wrapper-web';
  datos : Datos;
  private champName = "Copa Corvette c6r";
  public url: string;

  ngOnInit(){
     this.datosService.getAllDatos(this.url).subscribe(val => this.datos = val);
    //console.log("datos", this.datosService.getAllDatos());
  }

}
