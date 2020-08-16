
const express = require('express');

const app = express();
const cors = require('cors');
const cheerio = require('cheerio');
const request = require('request');
const http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();

const ws = require('ws');
const fs = require('fs');



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

function generarTablaequipos() {
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = (e) => {

    let $ = cheerio.load(Http.responseText);

    let datos = [];

    let continuar = true;
    $('tr > td').each(function (i, e) {
      let selection = $(this).toString();
      console.log(selection);
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

//para equipos de ac
app.route('/api/datosequipos').get((req, res) => {
  url = req.query.url;
  generarTablaequipos(req, res);
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


//https://www.pubnub.com/blog/nodejs-websocket-programming-examples/
// Node.js socket server script

//https://javascript.info/websocket


const wss = new ws.Server({noServer: true});

function accept(req, res) {
  // all incoming requests must be websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  // can be Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
    let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Cliente";
    ws.send(`Informacion recibida, ${name}!`);
    console.log(message);
    fs.writeFile('prueba1.json',message, function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(9898);
  console.log('server ready');
} else {
  exports.accept = accept;
}