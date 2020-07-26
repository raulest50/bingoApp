// lista de todos los cartones generados
var jugadores = {};
var cartones = [];


const express = require("express");
var exphbs  = require('express-handlebars'); // templating engine
const app = express();
app.engine('handlebars', exphbs()); // setting up hadlebars como el motor de plantillas
app.set('view engine', 'handlebars');

// para poder procesar postrequest se debe hace npm install body-parser y poner las dos lineas siguientes->
var bodyParser = require('body-parser'); // antes venia con express pero ya no
app.use(bodyParser.urlencoded({extended: false})); // con esto ya no aparece undefined en request.body

var cookieParser = require('cookie-parser');
app.use(cookieParser());

const quantumRandom = require('qrandom'); // para generar verdaderos numeros aleatorios basado en fisica cuantica
const shortid = require('shortid'); // para generar identificaciones
var mf = require('./mis_metodos');

// hace que todo el contenido de la carpeta public este disponible
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// cuando se ingresa por primera vez a la sala
app.post('/ingresar', function (request, response) {
  var nombre = request.body.nombre; // se lee el nombre que el jugador ingreso
  var id = shortid.generate(); //se genera un id para el jugador
  response.cookie('aristibingo-id', id);
  response.cookie('aristibingo-nombre', nombre);
  response.sendFile(__dirname + "/views/sala.html");
});


// genera un carton nuevo
app.post('/generar-carton', function (request, response) {
  var id = request.body.id;
  var nombre = request.body.nombre;
  console.log(nombre);
  console.log(id);
  // genera una listta de numeros aleatorios, pero hay que pasar un callback
  quantumRandom('uint8', 24, 10, (error, data) => {  
    if (error) return console.error(error);
    var carton = buildCarton(data); // se construye un carton de bingo unico
    jugadores[id]={'nombre':nombre, 'carton':{}};// se agrega el jugador a la lista
    jugadores[id]['carton'] = carton;
    console.log(jugadores);
    response.json(carton);
    //response.send('hola mudo fetch');
    console.log(data);
    console.log(carton);
  });
});


// cuando se va a recuperar un carton con el id
app.post('/load', function (request, response) {
  response.sendFile(__dirname + "/views/carton.html");
});


// solo genera un carton de bingo a partir de 24 unit8, pero sin el id nombre de propietario ni tampoco lo agrega a la lista
function buildCarton(q){
  var repetido=false;
  var carton;
  do{ // con el do while, la comprovacion se hace al final por lo que se garantiza que el bucle se hace almenos una vez
    repetido = false; // inicia como falso
    carton = mf.genCarton(q); // se genera un carton
    for(var x in cartones){ // se compara con los demas para ver si esta repetido
      if(JSON.stringify(cartones[x])==JSON.stringify(carton)) repetido=true;
    } // en caso de haber una repeticion repetido pasa a true con lo que el bucle se ejecuta de nuevo
  } while(repetido==true);
  return carton;
}


// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});