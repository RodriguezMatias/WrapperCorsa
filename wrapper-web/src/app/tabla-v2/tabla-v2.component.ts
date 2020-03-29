import { Component, OnInit } from '@angular/core';
import { DatosService, Datos } from '../services/datos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabla-v2',
  templateUrl: './tabla-v2.component.html',
  styleUrls: ['./tabla-v2.component.scss']
})
export class TablaV2Component implements OnInit {

  constructor(private datosService : DatosService,private route: ActivatedRoute) { }

  title = 'wrapper-web';
  datos : Datos;
  public url : string;
  public categoria ;
  public numerofecha ; 

  ngOnInit(){
    console.log(this.route);
    this.route.params.subscribe(params => {
       this.categoria = params['categoria'];
       this.numerofecha = params['numerofecha'];
      console.log(this.categoria);
    //gt3
    if(this.categoria == 'gt3'){
      this.url='http://vps1.ils.simracer.com.ar:8773/championship/bf5b50c3-83c4-4aee-aa0b-e67dae515dc2';
      this.datosService.getAllDatos(this.url).subscribe(val => this.datos = val);
    }
    if(this.categoria == 'gt4'){
    //gt4
    this.url='http://vps1.ils.simracer.com.ar:8774/championship/e9fdfdcb-a6d6-41f4-92a7-3c354443e975';
    this.datosService.getAllDatos(this.url).subscribe(val => this.datos = val);
  }
  if(this.categoria == 'gt3cup'){
    //gt3cup
    this.datosService.getrF2Datos().subscribe(val => this.datos = val);
  }
  });
    
  }

}
