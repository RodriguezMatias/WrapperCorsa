var exampleSocket = new WebSocket("ws://http://localhost:8000/api/datos", "protocolOne");

exampleSocket.send("Here's some text that the server is urgently awaiting!"); 


var equipos = {
     pos : [],
     team : [],
     points : []
}

for (i=2; i <= 12;i++){
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

for (i=2; i <= 12;i++){   
    pilotos.pos[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(1)").innerText;
    pilotos.driver[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(2)").innerText;
    pilotos.team[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(3)").innerText;
    pilotos.points[i-2] = document.querySelector("#drivers > div > table > tbody > tr:nth-child("+i+") > td:nth-child(4)").innerText;
}

console.log(pilotos);

