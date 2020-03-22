//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
//ESTO NO SE USA.
const cheerio = require('cheerio');
const request = require('request');
const http = require('http');

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


const Http = new XMLHttpRequest();
const url = 'http://vps1.ils.simracer.com.ar:8773/championship/8890ecb2-9ba1-44d7-96ab-77b7b615709d';

Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {

  let $ = cheerio.load(Http.responseText);

  // console.log(title.text());

  let hobbies = [];

  let continuar = true;
  $('tr > td').each(function (i, e) {
       let selection = $(this).toString();
       selection.trim(selection);
       selection = selection.replace(/\s/g, '');
       selection = selection.replace(/td/g, '');
       selection = selection.replace(/\//g,'');
       selection = selection.replace(/</g,'');
       selection = selection.replace(/>/g,'');
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

  let pos = [];
  let nombre = [];
  let puntos = [];
  for (var i = 0; i < hobbies.length; i++) {

      puntos[i] = hobbies.shift(); ;
      nombre[i] = hobbies.shift(); ;
      pos[i] = hobbies.shift(); ;
  }

    console.log(pos);
   console.log(nombre);
    console.log(puntos);

//  var pos = http.request(options, callback).end();


module.exports.pos = pos;
module.exports.nombre= nombre;
module.exports.puntos = puntos;
}


  // const doc = new DOMParser().parseFromString(html, 'text/html');
  // title = doc.title; body = doc.body;

