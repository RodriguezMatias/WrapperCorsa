import { Component, OnInit } from '@angular/core';
import { DatosService, Datos } from '../services/datos.service';
import { ActivatedRoute } from '@angular/router';
import htmlToImage from 'html-to-image';
import { saveAsPng, saveAsJpeg } from 'save-html-as-image';
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
  public loading :boolean;

  ngOnInit(){

    this.loading = false;
    console.log(this.route);
    this.route.params.subscribe(params => {
       this.categoria = params['categoria'];
       this.numerofecha = params['numerofecha'];
      console.log(this.categoria);
    //gt3
    if(this.categoria == 'gt3'){
      this.url='http://vps1.ils.simracer.com.ar:8773/championship/fa23af05-4e84-450f-adf6-b3a8d7cd94d7';
      this.datosService.getAllDatos(this.url).subscribe(val => this.datos = val);
    }
    if(this.categoria == 'gt4'){
    //gt4
    this.url='http://vps1.ils.simracer.com.ar:8774/championship/3f78b789-b58e-4045-bb88-3fb495227068';
    this.datosService.getAllDatos(this.url).subscribe(val => this.datos = val);
  }
  if(this.categoria == 'gt3cup'){
    //gt3cup
    this.datosService.getrF2Datos().subscribe(val => this.datos = val);
  }
 
  });
    
  }

  takeScreenshot(){
    const node = document.getElementById('tablacompleta');
    saveAsPng(node, {  filename: 'Report', printDate: true });
    //saveAsJpeg(node, {  filename: 'Album', printDate: false });
  }

  refresh(): void {
    window.location.reload();
}
}
