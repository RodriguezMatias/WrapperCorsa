
const express = require('express');

const app = express();

const cors = require('cors');

const cheerio = require('cheerio');
const request = require('request');
const http = require('http');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const Http = new XMLHttpRequest();

  //campeonato gt3 
  const url = 'http://vps1.ils.simracer.com.ar:8773/championship/bf5b50c3-83c4-4aee-aa0b-e67dae515dc2';

Http.open("GET", url);
Http.send();

  //definicion de arrays para devolver la data
  let pos = [];
  let nombre = [];
  let equipo = [];
  let puntos = [];

Http.onreadystatechange = (e) => {

  let $ = cheerio.load(Http.responseText);

  let datos = [];


  let continuar = true;
   $('tr > td').each(function (i, e) {
       let selection = $(this).toString();
       
       //eliminamos tags html y espacios sobrantes en nombres
       selection = selection.replace(/<\/td>/g,'');
       selection = selection.replace(/<td>/g,'');
       selection = selection.replace(/^\s+|\s+$|\s+(?=\s)/g,'');
       //para Lucas O´Neille
       selection = selection.replace(/&apos;/g,' ');

      //corte mal implementado para cuando termina la tabla
       if (selection.includes("spandata-toggle")){
        continuar = false; 
       }   
       if (continuar == true){
         
          if(!selection.includes("\n")){
            if(!selection.includes("</strong>")){
              datos[i] = selection;
          }   
        }
       }   
  });


  //cargamos el string parseado en arrays
  let continuaCarga = true;
  let posicionActual = 0;
  let poscionAnterior = 0;
   for (var i = 0; i < datos.length; i++) {
      posicionActual = datos.shift();
      if(posicionActual < poscionAnterior){
        continuaCarga = false;
      }
      else{
        poscionAnterior++;
      }  
      if(continuaCarga){ 
      pos[i] = posicionActual ;
      nombre[i] = datos.shift();
      equipo[i] = datos.shift();
      puntos[i] = datos.shift();
    }
  
  }
}

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.listen(8000, () => {
    console.log('Server started!')
  })
 
  var respuesta = {
    pos,
    nombre,
    equipo,
    puntos
  }
  respuesta.pos = pos;
  respuesta.nombre = nombre;
  respuesta.equipo = equipo;
  respuesta.puntos = puntos;
  app.route('/api/datos').get((req, res) => {
    res.send({
      pos,
      nombre,
      equipo,
      puntos
    })
  })