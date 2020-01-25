
const express = require('express');

const app = express();

const cors = require('cors');

const cheerio = require('cheerio');
const request = require('request');
const http = require('http');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const Http = new XMLHttpRequest();
const url = 'http://vps1.ils.simracer.com.ar:8773/championship/8890ecb2-9ba1-44d7-96ab-77b7b615709d';

Http.open("GET", url);
Http.send();

let pos = [];
  let nombre = [];
  let puntos = [];

Http.onreadystatechange = (e) => {

  let $ = cheerio.load(Http.responseText);

  // console.log(title.text());

  let hobbies = [];

  let continuar = true;
  $('tr > td').each(function (i, e) {
       let selection = $(this).toString();
      //  selection = selection.replace(/\s/g, '');
      //  selection = selection.replace(/^\s+|\s+$/g, '');
      //  selection = selection.replace(/td/g, '');
      //  selection = selection.replace(/\//g,'');
      //  selection = selection.replace(/</g,'');
      //  selection = selection.replace(/>/g,'');
     
       selection = selection.replace(/<\/td>/g,'');
       selection = selection.replace(/<td>/g,'');
       selection = selection.replace(/^\s+|\s+$|\s+(?=\s)/g,'');
       

       if (selection.includes("spandata-toggle")){
        continuar = false; 
       }   
       if (continuar == true){
         
          if(!selection.includes("\n")){
            if(!selection.includes("</strong>")){
              hobbies[i] = selection;
          }   
        }
       }   
  });

  //console.log(hobbies);

  let continuaCarga = true;
  let posicionActual = 0;
  let poscionAnterior = 0;
   for (var i = 0; i < hobbies.length; i++) {
    //for (var i = 0; i < 22; i++) {
      posicionActual = hobbies.shift();
      if(posicionActual < poscionAnterior){
        continuaCarga = false;
      }
      else{
        poscionAnterior++;
      }  
      if(continuaCarga){ 
      pos[i] = posicionActual ;
      nombre[i] = hobbies.shift(); ;
      puntos[i] = hobbies.shift(); ;
    }
  
  }
}

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(cors(corsOptions));

app.listen(8000, () => {
    console.log('Server started!')
  })
 
  // console.log('asd',require('./scrapper.js').pos);
  // var pos =  require('./scrapper.js').pos;
  // var nombre = require('./scrapper.js').nombre;
  // var puntos = require('./scrapper.js').puntos;

  var respuesta = {
    pos,
    nombre,
    puntos
  }
  respuesta.pos = pos;
  respuesta.nombre = nombre;
  respuesta.puntos = puntos;
  app.route('/api/datos').get((req, res) => {
    res.send({
      pos,
      nombre,
      puntos
    })
  })

  app.route('/api/cats/:name').get((req, res) => {
    const requestedCatName = req.params['name']
    res.send({ name: requestedCatName })
  })