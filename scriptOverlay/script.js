var rounds = [
    {"points" : "null"},
    {"points" : "null"},
    {"points" : "null"},
    {"points" : "null"},
    {"points" : "null"},
    {"points" : "null"},
    {"points" : "null"},
    {"points" : "null"},
];

var entries = {
    "position" : "",
    "previousPosition" : "",
    "carNumber" : "",
    "driverName" : "",
    "teamName" : "",
    "vehicleName" : "",
    "vehicleFile" : "",
    "carClass" : "",
    "totalPoints" : "",
    rounds    
};

var resultado = {
    "totalRounds": "8",
     standings : [
        {"carClass" : "usf2000",
        entries : [entries],
        },
        ],   
};


var resultadoJson = JSON.stringify(resultado);

console.log(resultadoJson);

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
download(resultadoJson, 'standings.json', 'text/plain');