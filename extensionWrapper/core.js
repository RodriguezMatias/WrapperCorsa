
   var btn = document.createElement("BUTTON");  
   btn.innerHTML = "Descargar Tabla";  
   btn.onclick = function(){

    var equipos = {
        nombreCampeonato : "",
        pos : [],
        team : [],
        points : []
   }
   
   //var cantidadEquipos = $("#teams > div > table > tbody > tr").length;
   var cantidadEquipos = document.querySelectorAll('#teams > div > table > tbody > tr').length;
   //console.log("cantidadEquipos" + cantidadEquipos);
   
   for (i=2; i <= cantidadEquipos;i++){
        equipos.pos[i-2] = document.querySelector("#teams > div > table > tbody > tr:nth-child("+i+") > td:nth-child(1)").innerText;
        equipos.team[i-2] = document.querySelector("#teams > div > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").innerText;
        equipos.points[i-2] = document.querySelector("#teams > div > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").innerText;
   }
   
   
   for (i=2; i <= cantidadEquipos;i++){   
       equipos.team[i-2] =  equipos.team[i-2].replace(/\/n/g,"");
       equipos.team[i-2] =  equipos.team[i-2].replace(/^\s+|\s+$/g, "");
       }
   
   //nombre del campeonato para mandar con el mensaje
   equipos.nombreCampeonato = document.querySelector("body > div.container > div.championship > h1").innerText + " Equipos";
   
   console.log(equipos);
   
   var pilotos = {
       nombreCampeonato : "",
       pos : [],
       driver : [],
       team : [],
       points : []
   }
   
   //var cantidadPilotos = $("#drivers > div > table > tbody > tr").length;
   var cantidadPilotos = document.querySelectorAll('#drivers > div > table > tbody > tr').length;
   
   for (i=2; i <= cantidadPilotos;i++){   
       pilotos.pos[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(1)").innerText;
       pilotos.driver[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").innerText;
       pilotos.team[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").innerText;
       pilotos.points[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(4)").innerText;
   }
   
   pilotos.nombreCampeonato = document.querySelector("body > div.container > div.championship > h1").innerText  + " Pilotos";
   
   console.log(pilotos);
   
   //https://www.pubnub.com/blog/nodejs-websocket-programming-examples/
   const ws = new WebSocket('ws://localhost:9898/');
   ws.onopen = function() {
       console.log('WebSocket Client Connected');
       //ws.send('Conectado con el cliente.');
       ws.send(JSON.stringify(pilotos));
       ws.send(JSON.stringify(equipos));
   };
   ws.onmessage = function(e) {
     console.log("Received: '" + e.data + "'");
   };
  
};
    document.querySelector("#drivers-tab").appendChild(btn);          


  