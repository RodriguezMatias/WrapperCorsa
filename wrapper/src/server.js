
const express = require('express');

const app = express();
const cors = require('cors');
const cheerio = require('cheerio');
const request = require('request');
const http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();



let posrF2 = [];
let nombrerF2 = [];
let puntosrF2 = [];

function limpiardata(){
   posrF2 = [];
   nombrerF2 = [];
   puntosrF2 = [];
}
//rF2 related START
function generartablarF2(){
  'use strict';
  let jsonData = require('./rf2.json');
  var i = 1;
  while (jsonData["Class Overall"]["Driver Standings"]["drivers"][i] != null){
    posrF2.push(i);
    nombrerF2.push(jsonData["Class Overall"]["Driver Standings"]["drivers"][i]["name"]);
    puntosrF2.push(jsonData["Class Overall"]["Driver Standings"]["drivers"][i]["points_sum"]);
    i++;
  }
}
//rF2 related END 

var url = '';
//definicion de arrays para devolver la data
let pos = [];
let nombre = [];
let equipo = [];
let puntos = [];

function generarTabla() {
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {

    let $ = cheerio.load(Http.responseText);

    let datos = [];

    let continuar = true;
    $('tr > td').each(function (i, e) {
      let selection = $(this).toString();

      //eliminamos tags html y espacios sobrantes en nombres
      selection = selection.replace(/<\/td>/g, '');
      selection = selection.replace(/<td>/g, '');
      selection = selection.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
      //para Lucas O´Neille
      selection = selection.replace(/&apos;/g, ' ');
      //para independiente
      selection = selection.replace(/\(1 races\), \(1 races\)/g, ' ');
      //para sanciones acomodar para 1 o mas de 2 digitos
      selection = selection.replace(/<span class="badge badge-danger ml-2">Points Penalty: \d\d<\/span>/, ' ');

      //corte mal implementado para cuando termina la tabla
      if (selection.includes("spandata-toggle")) {
        continuar = false;
      }
      if (continuar == true) {

        if (!selection.includes("\n")) {
          if (!selection.includes("</strong>")) {
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
      if (posicionActual < poscionAnterior) {
        continuaCarga = false;
      }
      else {
        poscionAnterior++;
      }
      if (continuaCarga) {
        pos[i] = posicionActual;
        nombre[i] = datos.shift();
        equipo[i] = datos.shift();
        puntos[i] = datos.shift();
      }

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


//para ac
app.route('/api/datos').get((req, res) => {
  url = req.query.url;
  generarTabla(req, res);
  res.send({
    url,
    pos,
    nombre,
    equipo,
    puntos
  })
  pos.length = 0;
  nombre.length = 0;
  equipo.length = 0;
  puntos.length = 0;
})

//para rF2
 app.route('/api/datosrF2').get((req,res) => {
  limpiardata();
  generartablarF2();
   pos = posrF2;
   nombre =  nombrerF2;
   puntos =  puntosrF2;
   res.send({
     pos,
     nombre,
     puntos
   })
 })
