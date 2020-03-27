import { Component, OnInit } from '@angular/core';
import { DatosService } from '../services/datos.service';


export interface ServerData{
  url: string;
  serverName: string;
}

@Component({
  selector: 'app-cargar-campeonato',
  templateUrl: './cargar-campeonato.component.html',
  styleUrls: ['./cargar-campeonato.component.scss']
})


export class CargarCampeonatoComponent implements OnInit {

  serverData:ServerData;
  loading: boolean;
  public  numerocarrera;
  constructor(private datosService : DatosService) { 
    this.loading = true;
    this.numerocarrera = -1;
  }

  ngOnInit() {
    this.datosService.getServerData().subscribe(val => this.serverData = val);
    console.log('serverData',this.serverData);
    this.loading=false;
    console.log('serverData',this.loading);

  }

}
