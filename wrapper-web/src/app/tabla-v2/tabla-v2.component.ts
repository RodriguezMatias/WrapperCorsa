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
  public categoria;
  public loading :boolean;
  public numeroFecha;
  public numeroFecharF2;

  ngOnInit(){

    this.loading = false;
    console.log(this.route);
    this.route.params.subscribe(params => {
       this.categoria = params['categoria'];
       this.numeroFecharF2 = params['numerofecha'];
  
    if(this.categoria == 'clasea' || this.categoria == 'claseb' ){
    this.datosService.getdatospilotos(this.categoria).subscribe(val => this.datos = val);
    
    }
    if(this.categoria == 'rf2'){
    //rf2
    this.datosService.getrF2Datos().subscribe(val => this.datos = val);
    this.numeroFecha = this.numeroFecharF2;
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
