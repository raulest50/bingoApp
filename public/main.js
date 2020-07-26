Vue.component('celda', {
    props: ['estado', 'valor'],
    template: `
    <div> X </div>
    `,
    methods:{},
});

Vue.component('fila', {
    props: [],
    template: `
<celda></celda>
<celda></celda>
<celda></celda>
<celda></celda>
<celda></celda>
    `,
    methods:{},
});


var id = Cookies.get('aristibingo-id');
var nombre = decodeURIComponent(Cookies.get('aristibingo-nombre'));
console.log(id);
console.log(nombre);
var carton;

const url = 'https://aristibingo.glitch.me/generar-carton';
fetch(url,{
  method: 'POST', // or 'PUT'
  body: JSON.stringify({'id':id, 'nombre':nombre}), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
})
.then( res => {return res.json();})
.then( Jsondata => {
  carton = Jsondata;
  console.log(Jsondata);
}); 


var MiApp = new Vue({
    el: '#app',
    data:{
      nombre:nombre,
      id:id,
      carton:carton
    },
    created(){
        
    },
    mounted(){
        
    }
});