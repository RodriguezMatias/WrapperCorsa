var equipos = {
     pos : [],
     team : [],
     points : []
}

//var cantidadEquipos = $("#teams > div > table > tbody > tr").length;
var cantidadEquipos = document.querySelectorAll('#teams > div > table > tbody > tr').length;
//console.log("cantidadEquipos" + cantidadEquipos);

for (i=2; i < cantidadEquipos;i++){
     equipos.pos[i-2] = document.querySelector("#teams > div > table > tbody > tr:nth-child("+i+") > td:nth-child(1)").innerText;
     equipos.team[i-2] = document.querySelector("#teams > div > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").innerText;
     equipos.points[i-2] = document.querySelector("#teams > div > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").innerText;
}

console.log(equipos);

var pilotos = {
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

console.log(pilotos);

//https://developer.mozilla.org/es/docs/Web/API/WebSocket
//https://javascript.info/websocket
//https://www.pubnub.com/blog/nodejs-websocket-programming-examples/
const ws = new WebSocket('ws://localhost:9898/');
ws.onopen = function() {
    console.log('WebSocket Client Connected');
    ws.send('Conectado con el cliente.');
    ws.send(JSON.stringify(pilotos));
    ws.send(JSON.stringify(equipos));
};
ws.onmessage = function(e) {
  console.log("Received: '" + e.data + "'");
};

