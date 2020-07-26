const SCOLOR_NOHOVER = '#F8B58C'; // color del borde de la celda cuando EL MOUSE NO ESTA ENCIMA
const SCOLOR_HOVER = ''; // color del borde cuando el mouse esta encima
const FCOLOR_NOSEL = ''; //color de la celda cuando no  esta seleccionada 
const FCOLOR_SEL = ''; // color de la celda cuando esta seleccionada


SVG.on(document, 'DOMContentLoaded', function() {
  var draw = SVG().addTo('#carton_canvas').size('100%', '700px');
  //var box = draw.viewbox();
   draw.viewbox({ x: 0, y: 0, width: 500, height: 700 });
  draw5x5(draw, 0, 120, 60);
  draw.text()
});

function drawRow(draw, ix, y, z){
  draw.rect(z, z).move(ix, y).stroke('#F8B58C').fill('#F4DFBF');
  draw.rect(z, z).move(ix+10+z, y).stroke('#F8B58C').fill('#F4DFBF');
  draw.rect(z, z).move(ix+(10+z)*2, y).stroke('#F8B58C').fill('#F4DFBF');
  draw.rect(z, z).move(ix+(10+z)*3, y).stroke('#F8B58C').fill('#F4DFBF');
  draw.rect(z, z).move(ix+(10+z)*4, y).stroke('#F8B58C').fill('#F4DFBF');
}

function draw5x5(draw, ix, iy, z){
  drawRow(draw, ix, iy, z);
  drawRow(draw, ix, iy+(10+z), z);
  drawRow(draw, ix, iy+(10+z)*2, z);
  drawRow(draw, ix, iy+(10+z)*3, z);
  drawRow(draw, ix, iy+(10+z)*4, z);
}

function CrearCelda(draw, z, x, y, N){
  var estado = false;
  var celda = draw.rect(z, z).move(x, y).stroke(SCOLOR_NOHOVER).fill(FCOLOR_NOSEL);
  
  
  celda.mouseover(function() {
    this.attr({ stroke: '#f06' });
  });
  celda.mouseout(function() {
    this.attr({ stroke: '#000000' });
  });
}