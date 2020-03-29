
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

//rF2 related START

'use strict';
let jsonData = require('./rf2.json');
var i = 1;
while (jsonData["Class Overall"]["Driver Standings"]["drivers"][i] != null){
  posrF2.push(i);
  nombrerF2.push(jsonData["Class Overall"]["Driver Standings"]["drivers"][i]["name"]);
  puntosrF2.push(jsonData["Class Overall"]["Driver Standings"]["drivers"][i]["points_sum"]);
  i++;
}
console.log(posrF2);
 console.log(jsonData["Class Overall"]["Driver Standings"]["drivers"]["20"]["name"]);
// console.log(jsonData["Class Overall"]["Driver Standings"]["drivers"][i]["points_sum"]);



//rF2 related END 


//campeonato gt3
const serverName = 'Gt3 Open Series';
var url = 'http://vps1.ils.simracer.com.ar:8773/championship/bf5b50c3-83c4-4aee-aa0b-e67dae515dc2';



//definicion de arrays para devolver la data
let pos = [];
let nombre = [];
let equipo = [];
let puntos = [];

function generarTabla(req, res) {
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
app.route('/api/datos/rF2').get((req, res) => {
  res.send({
    posrF2,
    nombrerF2,
    puntosrF2
  })
})

app.route('/api/serverdata').get((req, res) => {
  res.send({
    url,
    serverName
  })
})

app.route('/api/serverdata').post((req, res) => {
  res.send({
    url,
    serverName
  })
})
