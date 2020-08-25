
const express = require('express');

const app = express();
const cors = require('cors');
//const cheerio = require('cheerio');
const request = require('request');
const http = require('http');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();

const ws = require('ws');
const fs = require('fs');

//inicio del servidor
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
  }
  
  app.use(cors(corsOptions));
  
  app.listen(8000, () => {
    console.log('Server started!')
  })
  

let posrF2 = [];
let nombrerF2 = [];
let puntosrF2 = [];

function limpiardata(){
    posrF2 = [];
    nombrerF2 = [];
    puntosrF2 = []; 
    pos = [];
    nombre = [];
    equipo = [];
    puntos = [];

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

//para rF2
app.route('/api/datosrF2').get((req,res) => {
    console.log("/api/datosrF2'");
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

     pos.length = 0;
     nombre.length = 0;
     equipo.length = 0;
     puntos.length = 0;  
   })

//finrF2


let pos = [];
let nombre = [];
let equipo = [];
let puntos = [];


//ac pilots related START

//limpiartabla

function limpiarTablaPiloto(){
    console.log("entro limpiar tabla");
    for (i=0;i<pos.length;i++){
    //para independiente
    equipo[i] = equipo[i].replace(/\((.*)/, ' ');
    //para sanciones acomodar para 1 o mas de 2 digitos
    //console.log(nombre[i]);
    nombre[i] = nombre[i].replace(/Points Penalty: \d\d/, ' ');    
    
    }        
}
function generarTablaPilotos(filename){
    'use strict';
    let jsonData = require('./'+filename+'.json');
    var i = 1;
    while (jsonData["pos"][i] != null){
      pos.push(i);
      nombre.push(jsonData["driver"][i]);
      equipo.push(jsonData["team"][i]);
      puntos.push(jsonData["points"][i]);
      i++;
    }
//revisar esto porque me parece que no va aca
    limpiarTablaPiloto();
  }
//ac pilots  related END 


//para pilotos ac
app.route('/api/datospilotos').get((req, res) => {
    limpiardata();
    console.log("/api/datospilotos'");
     clase = req.query.clase;
     console.log("clase",clase);
     if(clase == "clasea"){
         console.log("/clasea");
         generarTablaPilotos("PlusHardware Formula 2 Series Pilotos");
     }
     if(clase == "claseb"){
        console.log("/claseb");
        generarTablaPilotos("TuPack F3 Fixed Series Pilotos");
     }
    
    res.send({
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

//fin pilotos ac
//equipos ac (

function limpiarTablaEquipo(){
    console.log("entro limpiar tabla");
    for (i=0;i<pos.length;i++){
       // console.log(equipo[i])
        if(equipo[i] == ''){  
            equipo[i] = 'Independiente';
        }
    }        
    
}
//ac pilots related START
function generarTablaEquipos(filename){
    limpiardata();
    'use strict';
    let jsonData = require('./'+filename+'.json');
    var i = 1;
    while (jsonData["pos"][i] != null){
      pos.push(i);
      equipo.push(jsonData["team"][i]);
      puntos.push(jsonData["points"][i]);
      i++;
    }
    limpiarTablaEquipo();
  }
//ac pilots  related END 

app.route('/api/datosequipos').get((req, res) => {
    limpiardata();
    console.log("/api/datosequipos'");
    clase = req.query.clase;
    console.log("clase",clase);
    if(clase == "clasea"){
        generarTablaEquipos("PlusHardware Formula 2 Series Equipos");
    }
    if(clase == "claseb"){
        generarTablaEquipos("TuPack F3 Fixed Series Equipos");
    }    
    res.send({
      pos,
      equipo,
      puntos
    })
    pos.length = 0;
    nombre.length = 0;
    equipo.length = 0;
    puntos.length = 0;
})

//fin equipos ac

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
  var i = 0;
  ws.on('message', function (message) {
    let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Cliente";
    ws.send(`Informacion recibida, ${name}!`);
    //console.log(message);
    var messageJson = JSON.parse(message);

    fs.writeFile(messageJson.nombreCampeonato +'.json',message, function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    i++;
    setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(9898);
  console.log('server ready');
} else {
  exports.accept = accept;
}

//fin websocket
 
