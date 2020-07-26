// tabla completa de bingo75
const bingo75 = {'B':[1,   2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14, 15],
                 'I':[16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                 'N':[31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
                 'G':[64, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60],
                 'O':[61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
                  };

exports.bingo75 = bingo75; // se exporta la variable



exports.genCarton = function(qs){
  var fb = bingo75; // se copia la variable ya que se usara el metodo slice
  var Ti = {'B':qs.slice(0, 5), 
            'I':qs.slice(5, 10),
            'N':qs.slice(10, 14),
            'G':qs.slice(14, 19),
            'O':qs.slice(19, 24)
           };
  
  // se debe hacer slice() ya que con = no es suficiente para clonar un arraye en javascript.
  // al no hacer un cloning, al usar splice dentro getColumn para remover indices, al final bingo75
  // terminaba con los arrays vacios y empezaba a generar cartones con valores null.
  // al enviar en su lugar clones de los arrays con slice(), se soluciono el problema.
  var carton = {'B':getColumn(bingo75['B'].slice(), Ti['B']),
                'I':getColumn(bingo75['I'].slice(), Ti['I']),
                'N':getColumn(bingo75['N'].slice(), Ti['N']),
                'G':getColumn(bingo75['G'].slice(), Ti['G']),
                'O':getColumn(bingo75['O'].slice(), Ti['O']),
               }
  
  //console.log(JSON.stringify(carton));
  //console.log(prettyCarton(carton));
  return carton;
}

/**
de qrandom se generan 24 uint8, 5 B,I,G y O y 4 para N. 
ver http://www.bingo.es/articulos/bingo-75-bolas/#:~:text=El%20Bingo%2075%20Bolas%20es,de%205%20espacios%20cada%20una.
para mas informacion sobre como debe ser un carton de bingo 75.
los primero 5 numeros aleatorios de qrandom se usaran para escoger 5 numeros de 1-15 que es B. los numeros
generados por qrandom van hasta 1024 por ello se usa el calculo de residuos
o modulos para que funcione como in indexing circular, es devir que si un array esta conformado por 15 elementos sus indices
van de 0 a 14 y el indice 15 corresponde nuevamente al indice 0, 16 a 1, 17 a 2 y asi sucecivamente. de esta forma se puede mapear 
cualquier numero de 0 a 1024 a un indice dentro del array. una vez se escoge un numero de B este debe de salir del grupo de 15, para
no repetirlo. El proceso anteriormente descrito se debe hacer para cada grupo de 15 numeros, para I, N, G, O.
Este metodo solo genera una columna del carton, es decir que par construir el un carton de bingo se debe usar esta funcion 5
veces, para cada grupo de 15.
*/
function getColumn(A, ai){
  var i = 0; // indice actual de la iteracion, empieza en 0
  var r = []; // sera una columna del carton de bingo
  for(var x in ai){ // se mapea cad numero aleatorio a su respectivo indice dentro del grupo de 15 numeros
    var bi = (i+(ai[x]%A.length))%A.length; // bi corresponde al siguiente indice
    r.push(A[bi]); // se guarda el mapea de numero aleatorio de qrandom a numero del carton de bingo
    A.splice(bi, 1); // se remueve el numero escogido para no sacarlo de nuevo
    i=bi-1;// el indice i avanza bi pasos pero se resta uno ya que despues de escoger un numero este es removido
    // y por tanto el tamaño del grupo que en la primera iteracion es 15 se decrementa en una unidad cada ciclo
  }
  return r;
}


// solo genera una respresentacion string del carton de una manera relativamente legible,
// se usa solo para debugging.
function prettyCarton(c){
  var msg=
`
B  - I  - N  - G  - O
${c['B'][0]} - ${c['I'][0]} - ${c['N'][0]} - ${c['G'][0]} - ${c['O'][0]}
${c['B'][1]} - ${c['I'][1]} - ${c['N'][1]} - ${c['G'][1]} - ${c['O'][1]}
${c['B'][2]} - ${c['I'][2]} - X - ${c['G'][2]} - ${c['O'][2]}
${c['B'][3]} - ${c['I'][3]} - ${c['N'][2]} - ${c['G'][3]} - ${c['O'][3]}
${c['B'][4]} - ${c['I'][4]} - ${c['N'][3]} - ${c['G'][4]} - ${c['O'][4]}
`;
  return msg;
}
