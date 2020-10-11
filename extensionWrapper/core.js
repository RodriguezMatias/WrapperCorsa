
    var nroFecha = document.createElement("INPUT");
    nroFecha.setAttribute("type", "text");
    nroFecha.setAttribute("placeholder", "Nro Fecha");
    var circuito = document.createElement("INPUT");
    circuito.setAttribute("type", "text");
    circuito.setAttribute("placeholder", "Circuito");
    var btn = document.createElement("BUTTON");  
    btn.innerHTML = "Descargar Tabla"; 
    
    document.querySelector("#drivers-tab").appendChild(nroFecha);     
    document.querySelector("#drivers-tab").appendChild(circuito);   
    document.querySelector("#drivers-tab").appendChild(btn);  

    btn.onclick = function(){

    var equipos = {
        nombreCampeonato : "",
        nroFecha : "",
        circuito : "",
        pos : [],
        team : [],
        points : []
   }
   
   equipos.nroFecha = nroFecha.value;
   equipos.circuito = circuito.value;
   
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
       nroFecha : "",
       circuito : "",
       pos : [],
       driver : [],
       team : [],
       points : []
   }

   pilotos.nroFecha = nroFecha.value;
   pilotos.circuito = circuito.value;
   
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

          


  