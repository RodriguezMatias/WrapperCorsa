import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  @Input() public  numeroCarrera = '-1';
  @Input() public  circuito = 'No definido';
  public datosCarrera = 'No hay datos';
  constructor(private datosService : DatosService) { 
    this.loading = true;
    this.numeroCarrera;
  }

  ngOnInit() {
    // this.datosService.getServerData().subscribe(val => this.serverData = val);
    // console.log('serverData',this.serverData);
     this.loading=false;
    // console.log('serverData',this.loading);
  }

  onKey(event: any) { // without type info
    this.numeroCarrera = event.target.value;
    this.datosCarrera = 'Fecha ' + this.numeroCarrera + ' | ' + this.circuito;
  }
  onKey2(event: any) { // without type info
    this.circuito = event.target.value;
    this.datosCarrera = 'Fecha ' + this.numeroCarrera + ' | ' + this.circuito;
  }
}
